console.logGrid = (grid, identation = 0) => {
  let text = ''
  for (let x = 0; x < gridSize; x++) {
    for (let i = 0; i < identation; i++) {
      text += '   '
    }
    for (let y = 0; y < gridSize; y++) {
      text += ' ' + grid[y][x] + ' '
    }
    text += '\n'
  }
  console.log(text)
}