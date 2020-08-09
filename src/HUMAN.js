function HUMAN() {
  if (mouseIsPressed && players[currentPlayer + 1] === HUMAN &&
    scoresCalculated.length === scoresToBeCalculated) {
    const x = Math.floor(mouseX / quadSize)
    const y = Math.floor(mouseY / quadSize)

    if (grid[x] && grid[x][y] == 0) {
      grid[x][y] = currentPlayer
      changePlayer()
    }
  }
}