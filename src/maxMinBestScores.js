function minBestScores() {
  let minScore = Infinity
  let bestOnes = []

  for (calculation of scoresCalculated) {
    if (calculation.result === minScore)
      bestOnes.push(calculation)

    else if (calculation.result < minScore) {
      minScore = calculation.result
      bestOnes = [calculation]
    }
  }

  return bestOnes
}

function maxBestScores() {
  let maxScore = -Infinity
  let bestOnes = []

  for (calculation of scoresCalculated) {
    if (calculation.result === maxScore)
      bestOnes.push(calculation)

    else if (calculation.result > maxScore) {
      maxScore = calculation.result
      bestOnes = [calculation]
    }
  }

  return bestOnes
}