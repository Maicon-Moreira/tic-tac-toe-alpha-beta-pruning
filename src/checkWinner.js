function checkWinner(g) {
  let counter = 0
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      const player = g[x][y]
      if (player !== 0) {
        counter++

        // horizontal
        for (let distance = 1; distance < sequenceToWin; distance++) {
          if (g[x + distance] && g[x + distance][y] === player) {
            if (distance === sequenceToWin - 1)
              return player
          }
          else break
        }

        // vertical
        for (let distance = 1; distance < sequenceToWin; distance++) {
          if (g[x] && g[x][y + distance] === player) {
            if (distance === sequenceToWin - 1)
              return player
          }
          else break
        }

        // diagonal
        for (let distance = 1; distance < sequenceToWin; distance++) {
          if (g[x + distance] && g[x + distance][y + distance] === player) {
            if (distance === sequenceToWin - 1)
              return player
          }
          else break
        }

        // anti-diagonal
        for (let distance = 1; distance < sequenceToWin; distance++) {
          if (g[x + distance] && g[x + distance][y - distance] === player) {
            if (distance === sequenceToWin - 1)
              return player
          }
          else break
        }

      }
    }
  }

  if (counter === gridSize ** 2)
    return 0
  else
    return null
}