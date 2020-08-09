function newGrid(size) {
  const grid = []
  for (let x = 0; x < size; x++) {
    grid[x] = []
    for (let y = 0; y < size; y++) {
      grid[x][y] = 0
    }
  }
  return grid
}

function randomNewGrid(size) {
  const grid = []
  for (let x = 0; x < size; x++) {
    grid[x] = []
    for (let y = 0; y < size; y++) {
      grid[x][y] = Math.floor(Math.random() * 3)
    }
  }
  return grid
}