function changePlayer() {
  currentPlayer = currentPlayer == 1 ? -1 : 1

  scoresCalculated = []

  scoresRequired = true

  for (const worker of workers)
    worker.terminate()

  createWorkers()
}