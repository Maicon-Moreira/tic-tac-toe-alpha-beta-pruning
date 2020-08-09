function TICFISH() {
  // X -> 1
  if (currentPlayer == 1 &&
    players[currentPlayer + 1] === TICFISH &&
    scoresCalculated.length === scoresToBeCalculated) {

    const [bestMoves, maxScore] = maxBestScores()
    scoreSelected = maxScore

    const selected = randomItem(bestMoves)

    grid = selected.grid

    console.log(bestMoves)

    changePlayer()
  }

  // O -> -1
  else if (players[currentPlayer + 1] === TICFISH &&
    scoresCalculated.length === scoresToBeCalculated) {

    const [bestMoves, minScore] = minBestScores()
    scoreSelected = minScore

    const selected = randomItem(bestMoves)

    grid = selected.grid

    console.log(bestMoves)

    changePlayer()
  }
}