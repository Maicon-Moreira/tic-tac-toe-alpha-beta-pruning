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