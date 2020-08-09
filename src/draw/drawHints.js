function drawHints() {
  if (showHints) {

    let minResult = Infinity
    let maxResult = -Infinity

    for (const calculation of scoresCalculated) {
      if (calculation.result > maxResult) maxResult = calculation.result
      if (calculation.result < minResult) minResult = calculation.result
    }
    const resultDiff = maxResult - minResult

    for (const calculation of scoresCalculated) {
      const newGrid = calculation.grid
      const result = calculation.result
      let colorIntensity = (result - minResult) / resultDiff

      if (colorIntensity < 0.5) fill(255 * abs(colorIntensity - 0.5) * 2, 0, 0)
      else fill(0, 255 * abs(colorIntensity - 0.5) * 2, 0)

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (grid[x][y] !== newGrid[x][y]) {

            if (abs(calculation.result) === Infinity) calculation.result = '∞'
            text(calculation.result, x * quadSize + quadSize / 2, y * quadSize + quadSize / 2)

          }
        }
      }
    }
  }
}