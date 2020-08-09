function createWorkers() {
  for (let i = 0; i < gridSize ** 2; i++) {
    const worker = new Worker('./src/alphabetaWorker.js')

    worker.onmessage = e => {
      // console.log(e.data)
      scoresCalculated.push(e.data)
      finishedCalculateScores = new Date()
    }

    workers[i] = worker
  }
}