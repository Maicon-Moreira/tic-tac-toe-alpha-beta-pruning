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

function randomNewGrid(size) {
  const grid = []
  for (let x = 0; x < size; x++) {
    grid[x] = []
    for (let y = 0; y < size; y++) {
      grid[x][y] = Math.floor(Math.random() * 3)
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

      } else if (grid[x][y] == -1) {
        stroke(255, 0, 0)
        strokeWeight(10)

        circle(x * quadSize + quadSize / 2, y * quadSize + quadSize / 2, quadSize * 0.6)
      }
    }
  }
}

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

function maxNumberIndexes(array) {
  let maxNumber = -Infinity
  let indexes = []

  for (const i in array) {
    const item = array[i]

    if (item == maxNumber) {
      indexes.push(i)
    }
    else if (item > maxNumber) {
      indexes = [i]
      maxNumber = item
    }
  }

  return [indexes, maxNumber]
}

function minNumberIndexes(array) {
  let minNumber = Infinity
  let indexes = []

  for (const i in array) {
    const item = array[i]

    if (item == minNumber) {
      indexes.push(i)
    }
    else if (item < minNumber) {
      indexes = [i]
      minNumber = item
    }
  }

  return [indexes, minNumber]
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function changePlayer() {
  currentPlayer = currentPlayer == 1 ? -1 : 1
}