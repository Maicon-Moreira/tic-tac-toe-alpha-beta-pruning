function drawCalculationBar() {
  noStroke()
  if (currentPlayer === 1) fill(0, 255, 0)
  else if (currentPlayer === -1) fill(255, 0, 0)

  rect(0, ws, ws * scoresCalculated.length / scoresToBeCalculated, barHeight)
}