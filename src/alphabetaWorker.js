onmessage = function (e) {
  const gridSize = e.data.gridSize
  const sequenceToWin = e.data.sequenceToWin
  let calculations = 0
  let pruning = 0

  function max(a, b) {
    if (a > b) return a
    else return b
  }

  function min(a, b) {
    if (a < b) return a
    else return b
  }

  function checkWinner(g) {
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const player = g[x][y]
        if (player !== 0) {

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

    return 0
  }

  function heuristic(g) {
    let value = 0
    let counter = 0

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const player = g[x][y]
        if (player !== 0) {

          // horizontal
          counter = 0
          for (let distance = 1; distance < sequenceToWin; distance++) {
            if (!g[x + distance])
              break
            else if (g[x + distance][y] === player)
              counter++
            else if (g[x + distance][y] !== 0)
              break

            if (distance === sequenceToWin - 1)
              value += player * (10 ** counter)
          }

          // vertical
          counter = 0
          for (let distance = 1; distance < sequenceToWin; distance++) {
            if (!g[x])
              break
            else if (g[x][y + distance] === player)
              counter++
            else if (g[x][y + distance] !== 0)
              break

            if (distance === sequenceToWin - 1)
              value += player * (10 ** counter)
          }


          // diagonal
          counter = 0
          for (let distance = 1; distance < sequenceToWin; distance++) {
            if (!g[x + distance])
              break
            else if (g[x + distance][y + distance] === player)
              counter++
            else if (g[x + distance][y + distance] !== 0)
              break

            if (distance === sequenceToWin - 1)
              value += player * (10 ** counter)
          }


          // anti-diagonal
          counter = 0
          for (let distance = 1; distance < sequenceToWin; distance++) {
            if (!g[x + distance])
              break
            else if (g[x + distance][y - distance] === player)
              counter++
            else if (g[x + distance][y - distance] !== 0)
              break

            if (distance === sequenceToWin - 1)
              value += player * (10 ** counter)
          }
        }
      }
    }

    return value
  }

  function alphabeta(node, depth, alpha, beta, maximizing) {
    calculations++

    if (depth === 0 || checkWinner(node) !== 0) {
      return heuristic(node)
    }

    // maximizing
    if (maximizing) {
      let maxValue = -Infinity

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (node[x][y] === 0) {
            node[x][y] = 1

            const value = alphabeta(node, depth - 1, alpha, beta, false)
            maxValue = max(maxValue, value)
            alpha = max(alpha, value)

            node[x][y] = 0

            if (beta <= alpha) {
              pruning++
              return maxValue
            }
          }
        }
      }

      return maxValue
    }

    // minimizing
    else {
      let minValue = Infinity

      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          if (node[x][y] === 0) {
            node[x][y] = -1

            const value = alphabeta(node, depth - 1, alpha, beta, true)
            minValue = min(minValue, value)
            beta = min(beta, value)

            node[x][y] = 0

            if (beta <= alpha) {
              pruning++
              return minValue
            }
          }
        }
      }

      return minValue
    }
  }

  postMessage({
    result:
      alphabeta(e.data.node, e.data.depth - 1, -Infinity, Infinity, e.data.maximizing),
    calculations,
    pruning,
    grid: e.data.node
  })
}