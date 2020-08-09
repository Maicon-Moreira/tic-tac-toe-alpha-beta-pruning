function drawGrid(grid) {
  noFill()

  for (let x = 0; x < gridSize; x++) {

    stroke(150)
    strokeWeight(2)

    line(x * quadSize, 0, x * quadSize, ws)
    line(0, x * quadSize, ws, x * quadSize)
    line((x + 1) * quadSize, 0, (x + 1) * quadSize, ws)
    line(0, (x + 1) * quadSize, ws, (x + 1) * quadSize)

    for (let y = 0; y < gridSize; y++) {
      if (grid[x][y] == 1) {
        stroke(0, 255, 0)
        strokeWeight(10)

        line(x * quadSize + quadSize / 4,
          y * quadSize + quadSize / 4,
          x * quadSize + quadSize * 3 / 4,
          y * quadSize + quadSize * 3 / 4)

        line(x * quadSize + quadSize / 4,
          y * quadSize + quadSize * 3 / 4,
          x * quadSize + quadSize * 3 / 4,
          y * quadSize + quadSize / 4)

      } else if (grid[x][y] == -1) {
        stroke(255, 0, 0)
        strokeWeight(10)

        circle(x * quadSize + quadSize / 2, y * quadSize + quadSize / 2, quadSize * 0.6)
      }
    }
  }
}