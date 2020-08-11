function requireScores() {
  scoresCalculated = []
  startedCalculateScores = new Date()

  // X -> 1
  if (currentPlayer == 1) {
    const moves = createMoves(grid, 1)
    scoresToBeCalculated = moves.length

    for (let i in moves) {
      const worker = workers[i]
      const move = moves[i]

      worker.postMessage({
        grid,
        node: move,
        depth: initialDepth,
        maximizing: false,
        gridSize,
        sequenceToWin,
        searchOrder
      })
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
        grid,
        node: move,
        depth: initialDepth,
        maximizing: true,
        gridSize,
        sequenceToWin,
        searchOrder
      })
    }
  }

  scoresRequired = false
}