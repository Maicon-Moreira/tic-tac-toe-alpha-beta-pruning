const player1 = document.getElementById('1')
const player2 = document.getElementById('2')
const restart = document.getElementById('restart')
const hints = document.getElementById('hints')
const status = document.getElementById('status')
const boardSize = document.getElementById('boardSizeSelect')

player1.value = 'TICFISH'
boardSize.value = '5'

player1.onchange = e => {
  const value = e.target.value === 'TICFISH' ? TICFISH : HUMAN

  if (players[2] !== value) {
    players[2] = value
    restartGame()
  }
}

player2.onchange = e => {
  const value = e.target.value === 'TICFISH' ? TICFISH : HUMAN

  if (players[0] !== value) {
    players[0] = value
    restartGame()
  }
}

restart.onclick = () => restartGame()

hints.onclick = () => showHints = !showHints

boardSize.onchange = e => {
  const value = e.target.value

  if (value === '3'){
    gridSize = 3
    sequenceToWin = 3
    initialDepth = 10
    quadSize = ws / gridSize

    restartGame()
  }
  if (value === '4'){
    gridSize = 4
    sequenceToWin = 3
    initialDepth = 10
    quadSize = ws / gridSize

    restartGame()
  }
  if (value === '5'){
    gridSize = 5
    sequenceToWin = 4
    initialDepth = 7
    quadSize = ws / gridSize

    restartGame()
  }
  if (value === '6'){
    gridSize = 6
    sequenceToWin = 4
    initialDepth = 6
    quadSize = ws / gridSize

    restartGame()
  }
  if (value === '7'){
    gridSize = 7
    sequenceToWin = 4
    initialDepth = 6
    quadSize = ws / gridSize

    restartGame()
  }
}

function updateHud() {
  winner = checkWinner(grid)

  if (winner === 1) {
    status.innerText = 'Jogador X ganhou'
  }
  else if (winner === -1) {
    status.innerText = 'Jogador O ganhou'
  }
  else if (winner === 0) {
    status.innerText = 'Velha'
  }
  else if (scoreSelected === '?') {
    status.innerText = '???????'
  }
  else if (scoreSelected === 0) {
    status.innerText = 'Empatado'
  }
  else if (scoreSelected > 0) {
    status.innerText = 'Jogador X está na vantagem'
  }
  else if (scoreSelected < 0) {
    status.innerText = 'Jogador O está na vantagem'
  }
  else if (scoreSelected === Infinity || scoreSelected === - Infinity) {
    status.innerText = 'Vai dar velha'
  }
}