const ws = 400
const initialDepth = 5
const sequenceToWin = 4
const maxDepth = 8
const players = [TICFISH, HUMAN]
let gridSize = 5
let quadSize = ws / gridSize
let grid = newGrid(gridSize)
let possibleLines = makePossibleLines()
let numPossibleLines = possibleLines.length

console.log(possibleLines)
// console.logGrid(grid)

function setup() {
  createCanvas(ws, ws)


  grid[0][0] = 1
  grid[0][1] = 2
  // grid[0][2] = 1
  // grid[0][3] = 1



  // console.log(heuristic(grid, 1))

  const moves = createMoves(grid, 1)

  for (const move of moves) {
    console.logGrid(move)
    console.log(alphabeta(move, maxDepth, -Infinity, Infinity, true))
  }

  // console.log(moves)

}

function draw() {
  drawGrid(grid)
}

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

function drawGrid(grid) {
  background(50, 100, 200)

  noFill()

  for (let x = 0; x < gridSize; x++) {

    stroke(0)
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

      } else if (grid[x][y] == 2) {
        stroke(255, 0, 0)
        strokeWeight(10)

        circle(x * quadSize + quadSize / 2, y * quadSize + quadSize / 2, quadSize * 0.6)
      }
    }
  }
}

console.logGrid = (grid) => {
  let text = ''
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      text += ' ' + grid[y][x] + ' '
    }
    text += '\n'
  }
  console.log(text)
}

function heuristic(grid, player) {
  let value = 0

  for (let i = 0; i < numPossibleLines; i++) {
    value += checkLine(grid, player, possibleLines[i])
  }

  return value
}

function checkLine(grid, player, line) {
  let value = 0

  for (let i = 0; i < sequenceToWin; i++) {
    if (!grid[line[i][0]][line[i][1]] == 0) {
      if (grid[line[i][0]][line[i][1]] != player) {
        return 0
      }
      else {
        value++
      }
    }
  }

  value = value ** 4
  return value
}

function makePossibleLines() {
  const lines = []

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let dX = -1; dX <= 1; dX++) {
        for (let dY = -1; dY <= 1; dY++) {
          if (

            !(dX == 0 && dY == 0) &&
            !(dX == -1 && dY == -1) &&
            !(dX == -1 && dY == 0) &&
            !(dX == -1 && dY == 1) &&
            !(dX == 0 && dY == -1) &&
            x + dX * (sequenceToWin - 1) >= 0 &&
            x + dX * (sequenceToWin - 1) < gridSize &&
            y + dY * (sequenceToWin - 1) >= 0 &&
            y + dY * (sequenceToWin - 1) < gridSize

          ) {

            lines.push(makeLine(x, y, dX, dY))

          }
        }
      }
    }
  }

  return lines
}

function makeLine(x, y, dX, dY) {
  const line = []

  for (let d = 0; d < sequenceToWin; d++) {
    line[d] = [x + dX * d, y + dY * d]
  }

  return line
}

function alphabeta(node, depth, alpha, beta, maximizing) {
  // console.log(copyGrid(node))
  // console.logGrid(node)
  if (depth == 0) {
    if (maximizing)
      return heuristic(grid, 1)
    else
      return heuristic(grid, 2)
  }

  if (maximizing) {
    let value = -Infinity

    // for each child of node do
    let breakAll = false

    for (let x = 0; x < gridSize; x++) {
      if (breakAll) break

      for (let y = 0; y < gridSize; y++) {
        if (node[x][y] == 0) {
          node[x][y] = 2

          value = max(value, alphabeta(node, depth - 1, alpha, beta, false))
          alpha = max(alpha, value)
          if (alpha >= beta) {
            breakAll = true
            break
          }

          node[x][y] = 0

          return value
        }
      }
    }
  }

  else {
    let value = Infinity

    // for each child of node do
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (node[x][y] == 0) {
          node[x][y] = 1

          value = min(value, alphabeta(node, depth - 1, alpha, beta, true))
          alpha = min(alpha, value)
          if (beta <= alpha) {
            break
          }

          node[x][y] = 0

          return value
        }
      }
    }
  }
}

function copyGrid(grid) {
  const newGrid = []
  for (const a in grid) {
    newGrid[a] = []
    for (const b in grid) {
      newGrid[a][b] = grid[a][b]
    }
  }
  return newGrid
}

function createMoves(grid, player) {
  const moves = []

  for (const x in grid) {
    for (const y in grid[0]) {
      if (grid[x][y] == 0) {
        const newMove = copyGrid(grid)
        newMove[x][y] = player
        moves.push(newMove)
      }
    }
  }

  return moves
}