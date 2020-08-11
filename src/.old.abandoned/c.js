

function checkWinnerC(grid) {
  const items = [].concat(...grid) // flatten array
  const arrayLength = items.length;
  const bytesPerElement = Module.HEAP32.BYTES_PER_ELEMENT;
  const arrayPointer = Module._malloc((arrayLength * bytesPerElement));

  Module.HEAP32.set(items, (arrayPointer / bytesPerElement));

  const response = Module.ccall('checkWinner', null, [], [arrayPointer]);

  Module._free(arrayPointer);

  if (response === -10000) return null
  else return response
}

function heuristicC(grid) {
  const items = [].concat(...grid) // flatten array
  const arrayLength = items.length;
  const bytesPerElement = Module.HEAP32.BYTES_PER_ELEMENT;
  const arrayPointer = Module._malloc((arrayLength * bytesPerElement));

  Module.HEAP32.set(items, (arrayPointer / bytesPerElement));

  const response = Module.ccall('heuristic', null, [], [arrayPointer]);

  Module._free(arrayPointer);

  return response
}

function alphabetaC(grid) {
  const items = [].concat(...grid) // flatten array
  const arrayLength = items.length;
  const bytesPerElement = Module.HEAP32.BYTES_PER_ELEMENT;
  const arrayPointer = Module._malloc((arrayLength * bytesPerElement));

  const items2 = [].concat(...searchOrder) // flatten array
  const arrayLength2 = items2.length;
  const bytesPerElement2 = Module.HEAP32.BYTES_PER_ELEMENT;
  const arrayPointer2 = Module._malloc((arrayLength2 * bytesPerElement2));

  Module.HEAP32.set(items, (arrayPointer / bytesPerElement));
  Module.HEAP32.set(items2, (arrayPointer2 / bytesPerElement2));

  const response = Module.ccall('alphabeta', null, [], [
    arrayPointer, 6, -100000, 100000, 1, arrayPointer2
  ]);

  Module._free(arrayPointer);
  Module._free(arrayPointer2);

  return response
}

setTimeout(() => {
  setInterval(() => {
    console.log(alphabetaC(grid))
  }, 0)
  setInterval(() => {
    console.log(alphabetaC(grid))
  }, 0)
}, 5000)
