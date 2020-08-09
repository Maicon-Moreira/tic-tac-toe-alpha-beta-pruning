const player1 = document.getElementById('1')
const player2 = document.getElementById('2')
const restart = document.getElementById('restart')
const hints = document.getElementById('hints')
const status = document.getElementById('status')

player1.value = 'TICFISH'

player1.onchange = e => {
  const value = e.target.value === 'TICFISH' ? TICFISH : HUMAN

  if (players[2] !== value) {
    players[2] = value
    restarGame()
  }
}

player2.onchange = e => {
  const value = e.target.value === 'TICFISH' ? TICFISH : HUMAN

  if (players[0] !== value) {
    players[0] = value
    restarGame()
  }
}

restart.onclick = restarGame

hints.onclick = () => showHints = !showHints

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

function restarGame() {
  currentPlayer = 1 // X
  grid = newGrid(gridSize)
  scoresRequired = true
  scoresToBeCalculated = Infinity
  scoresCalculated = []
  winner = null
}