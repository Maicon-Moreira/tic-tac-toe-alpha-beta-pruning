function HUMAN() {
  if (mouseIsPressed && players[currentPlayer + 1] === HUMAN) {
    const x = Math.floor(mouseX / quadSize)
    const y = Math.floor(mouseY / quadSize)

    if (grid[x] && grid[x][y] == 0) {
      grid[x][y] = currentPlayer

      // para marcar qual foi a pontuacao da jogada jogada
      scoreSelected = '?'
      for (const score of scoresCalculated){
        const newGrid = score.grid
        const result = score.result

        if (grid[x][y] !== newGrid[x][y]){
          scoreSelected = result
        }
      }

      changePlayer()

    }
  }
}