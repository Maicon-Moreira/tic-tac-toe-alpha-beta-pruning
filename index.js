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
let scoresRequired = true
let scoresToBeCalculated = Infinity
let scoresCalculated = []
let showHints = false


function setup() {
  createCanvas(ws, ws + barHeight)
  frameRate(15)
  textAlign(CENTER, CENTER)
  textSize(quadSize * 0.3)

  createWorkers()
}

function draw() {
  if (scoresRequired) requireScores()

  players[currentPlayer + 1]()

  drawGrid(grid)
  drawCalculationBar()
  drawHints()
}
