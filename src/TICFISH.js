function TICFISH() {
  // X -> 1
  if (currentPlayer == 1 &&
    players[currentPlayer + 1] === TICFISH &&
    scoresCalculated.length === scoresToBeCalculated) {

    const bestMoves = maxBestScores()

    const selected = randomItem(bestMoves)

    grid = selected.grid

    console.log(bestMoves)

    changePlayer()
  }

  // O -> -1
  else if (players[currentPlayer + 1] === TICFISH &&
    scoresCalculated.length === scoresToBeCalculated) {

    const bestMoves = minBestScores()

    const selected = randomItem(bestMoves)

    grid = selected.grid

    console.log(bestMoves)

    changePlayer()
  }
}