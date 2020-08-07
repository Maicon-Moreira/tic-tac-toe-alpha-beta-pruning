const ws = 400
let sequenceToWin = 4
let gridSize = 5
let initialDepth = 6
let players = [TICFISH, 'VS', HUMAN] // O VS X
let currentPlayer = 1 // X
let quadSize = ws / gridSize
let grid = newGrid(gridSize)
let calculations = 0
let pruning = 0
// let terminalNodes = [0, 0, 0]


function setup() {
  createCanvas(ws, ws)
}

function draw() {
  drawGrid(grid)

  players[currentPlayer + 1]()

  console.log(checkWinner(grid))
}


function TICFISH() {
  const scores = []

  // X -> 1
  if (currentPlayer == 1) {
    const moves = createMoves(grid, 1)

    for (let move of moves) {
      const score = alphabeta(move, initialDepth - 1, -Infinity, Infinity, false)
      scores.push(score)

      console.logGrid(move)
      console.log('score ' + score)
      console.log(calculations + ' cenários futuros')
      console.log(pruning + ' podas')
      console.log('------------------------------------')

      calculations = 0
      pruning = 0
    }

    const [indexes, maxNumber] = maxNumberIndexes(scores)
    const selected = randomItem(indexes)

    grid = moves[selected]

    console.log(scores)

    console.log(terminalNodes)
    terminalNodes = [0, 0, 0]

    changePlayer()
  }

  // O -> -1
  else {
    const moves = createMoves(grid, -1)

    for (let move of moves) {
      const score = alphabeta(move, initialDepth - 1, -Infinity, Infinity, true)
      scores.push(score)

      console.logGrid(move)
      console.log('score ' + score)
      console.log(calculations + ' cenários futuros')
      console.log(pruning + ' podas')
      console.log('------------------------------------')

      calculations = 0
      pruning = 0
    }

    const [indexes, minNumber] = minNumberIndexes(scores)
    const selected = randomItem(indexes)

    grid = moves[selected]

    console.log(scores)

    console.log(terminalNodes)
    terminalNodes = [0, 0, 0]

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