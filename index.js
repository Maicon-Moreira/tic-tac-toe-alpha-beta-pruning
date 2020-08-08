const ws = 400
const workers = []
const barHeight = 10
let sequenceToWin = 4
let gridSize = 5
let initialDepth = 6
let players = [HUMAN, 'VS', TICFISH] // O VS X
let currentPlayer = 1 // X
let quadSize = ws / gridSize
let grid = newGrid(gridSize)
let calculations = 0
let pruning = 0
let scoresRequired = true
let scoresToBeCalculated = Infinity
let scoresCalculated = []
let showHints = true


function setup() {
  createCanvas(ws, ws + barHeight)
  frameRate(15)
  textAlign(CENTER, CENTER)

  for (let i = 0; i < gridSize ** 2; i++) {
    const worker = new Worker('./alphabetaWorker.js')

    worker.onmessage = e => {
      console.log(e.data)
      scoresCalculated.push(e.data)
      TICFISH()
    }

    workers[i] = worker
  }
}

function draw() {
  if (scoresRequired) requireScores()

  players[currentPlayer + 1]()

  drawGrid(grid)
  drawCalculationBar()
  // drawHints()
}


function TICFISH() {
  // X -> 1
  if (currentPlayer == 1 &&
    scoresCalculated.length === scoresToBeCalculated) {

    const bestMoves = maxBestScores()

    const selected = randomItem(bestMoves)

    grid = selected.grid

    console.log(bestMoves)

    changePlayer()

  }

  // O -> -1
  else if (scoresCalculated.length === scoresToBeCalculated) {

    const bestMoves = minBestScores()

    const selected = randomItem(bestMoves)

    grid = selected.grid

    console.log(bestMoves)

    changePlayer()

  }
}

function HUMAN() {
  if (mouseIsPressed) {
    const x = Math.floor(mouseX / quadSize)
    const y = Math.floor(mouseY / quadSize)

    if (grid[x] && grid[x][y] == 0) {
      grid[x][y] = currentPlayer
      changePlayer()
    }
  }
}

function requireScores() {
  scoresCalculated = []

  // X -> 1
  if (currentPlayer == 1) {
    const moves = createMoves(grid, 1)
    scoresToBeCalculated = moves.length

    for (let i in moves) {
      const worker = workers[i]
      const move = moves[i]


      worker.postMessage({
        node: move,
        depth: initialDepth,
        maximizing: false,
        gridSize,
        sequenceToWin
      })


      console.log('posted')
    }
  }

  // O -> -1
  else {
    const moves = createMoves(grid, -1)
    scoresToBeCalculated = moves.length

    for (let i in moves) {
      const worker = workers[i]
      const move = moves[i]


      worker.postMessage({
        node: move,
        depth: initialDepth,
        maximizing: true,
        gridSize,
        sequenceToWin
      })


      console.log('posted')
    }
  }

  scoresRequired = false
}

function minBestScores() {
  let minScore = Infinity
  let bestOnes = []

  for (calculation of scoresCalculated) {
    if (calculation.result === minScore)
      bestOnes.push(calculation)

    else if (calculation.result < minScore) {
      minScore = calculation.result
      bestOnes = [calculation]
    }
  }

  return bestOnes
}

function maxBestScores() {
  let maxScore = -Infinity
  let bestOnes = []

  for (calculation of scoresCalculated) {
    if (calculation.result === maxScore)
      bestOnes.push(calculation)

    else if (calculation.result > maxScore) {
      maxScore = calculation.result
      bestOnes = [calculation]
    }
  }

  return bestOnes
}