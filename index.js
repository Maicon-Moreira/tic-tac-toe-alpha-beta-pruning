const ws = innerHeight > innerWidth ? innerWidth * 0.9 : innerHeight * 0.5
const gridSize = 5
const sequenceToWin = 4
const workers = []
const barHeight = 10
let searchOrder = []
let initialDepth = 7
let players = [HUMAN, 'VS', TICFISH] // O VS X
let currentPlayer = 1 // X
let quadSize = ws / gridSize
let grid = newGrid(gridSize)
let scoresRequired = true
let scoresToBeCalculated = Infinity
let scoresCalculated = []
let showHints = false
let startedCalculateScores
let finishedCalculateScores
let scoreSelected
let winner

function preload() {
  fontRegular = loadFont('./fonts/BalooTamma2-Regular.ttf');
  fontBold = loadFont('./fonts/BalooTamma2-Bold.ttf');
}

function setup() {
  createCanvas(ws, ws + barHeight)
  frameRate(15)
  textAlign(CENTER, CENTER)
  textSize(quadSize * 0.3)
  textFont(fontRegular);
  text('Font Style Normal', 10, 30);
  textFont(fontBold);
  text('Font Style Bold', 10, 70);

  createWorkers()

  searchOrder = createSearchOrder()
}

function draw() {
  if (scoresRequired) requireScores()

  if (winner === null)
    players[currentPlayer + 1]()

  drawGrid(grid)
  drawCalculationBar()
  drawHints()
  updateHud()

  console.log(finishedCalculateScores - startedCalculateScores)
}