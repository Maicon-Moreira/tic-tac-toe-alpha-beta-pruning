function restartGame() {
  changePlayer()
  currentPlayer = 1 // X
  grid = newGrid(gridSize)
  scoresRequired = true
  scoresToBeCalculated = Infinity
  scoresCalculated = []
  winner = null
}