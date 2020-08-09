function requireScores() {
  scoresCalculated = []

  // X -> 1
  if (currentPlayer == 1) {
    const moves = createMoves(grid, 1)
    scoresToBeCalculated = moves.length

    for (let i in moves) {
      const worker = workers[i]
      const move = moves[i]

      worker.postMessage({
        node: move,
        depth: initialDepth,
        maximizing: false,
        gridSize,
        sequenceToWin
      })

      console.log('posted')
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
        node: move,
        depth: initialDepth,
        maximizing: true,
        gridSize,
        sequenceToWin
      })

      console.log('posted')
    }
  }

  scoresRequired = false
}