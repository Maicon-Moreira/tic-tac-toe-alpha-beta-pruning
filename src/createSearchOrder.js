function createSearchOrder() {
  const searchOrder = []
  let distance = 0

  while (searchOrder.length < gridSize ** 2) {
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const search = [x, y]
        // console.log(gridSize / 2, gridSize / 2, x + 0.5, y + 0.5)
        if (dist(gridSize / 2, gridSize / 2, x + 0.5, y + 0.5) < distance &&
          !searchExists(searchOrder, search)) {

          searchOrder.push(search)

        }
      }
    }

    distance += 0.1
  }

  return searchOrder
}

function searchExists(searchOrder, search) {
  for (const oldSearch of searchOrder) {
    if (oldSearch[0] === search[0] && oldSearch[1] === search[1])
      return true
  }
  return false
}