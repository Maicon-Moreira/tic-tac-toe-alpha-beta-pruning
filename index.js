const ws = 400
const workers = []
const barHeight = 10
let sequenceToWin = 4
let gridSize = 5
let initialDepth = 4
let players = [HUMAN, 'VS', TICFISH] // O VS X
let currentPlayer = 1 // X
let quadSize = ws / gridSize
let grid = newGrid(gridSize)
let scoresRequired = true
let scoresToBeCalculated = Infinity
let scoresCalculated = []
let showHints = false


function setup() {
  createCanvas(ws, ws + barHeight)
  frameRate(15)
  textAlign(CENTER, CENTER)
  textSize(quadSize * 0.3)

  for (let i = 0; i < gridSize ** 2; i++) {
    const worker = new Worker('./src/alphabetaWorker.js')

    worker.onmessage = e => {
      console.log(e.data)
      scoresCalculated.push(e.data)
    }

    workers[i] = worker
  }
}

function draw() {
  if (scoresRequired) requireScores()

  players[currentPlayer + 1]()

  drawGrid(grid)
  drawCalculationBar()
  drawHints()
}