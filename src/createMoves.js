function createMoves(grid, player) {
  const moves = []

  for (const x in grid) {
    for (const y in grid[0]) {
      if (grid[x][y] == 0) {
        const newMove = copyGrid(grid)
        newMove[x][y] = player
        moves.push(newMove)
      }
    }
  }

  return moves
}