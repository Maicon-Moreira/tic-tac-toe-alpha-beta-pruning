function copyGrid(grid) {
  const newGrid = []
  for (const a in grid) {
    newGrid[a] = []
    for (const b in grid) {
      newGrid[a][b] = grid[a][b]
    }
  }
  return newGrid
}