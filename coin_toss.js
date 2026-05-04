let result = ''
let guess = ''
let winStreak = 0

const score = localStorage.getItem('score') ?
  JSON.parse(localStorage.getItem('score')) :
  { Wins: 0, Lose: 0 }

updateScoreBoard()

function play() {
  const random_number = parseFloat(Math.random()).toFixed(1)
  result = random_number <= 0.5 ? 'HEADS' : 'TAILS'

  const coin = document.getElementById('coin')
  const message = document.getElementById('result-message')
  const streakEl = document.getElementById('streak')

  message.textContent = ''
  message.className = ''
  coin.classList.remove('flipping')
  void coin.offsetWidth
  coin.classList.add('flipping')

  setTimeout(() => {
    coin.classList.remove('flipping')
    coin.textContent = result === 'HEADS' ? 'H' : 'T'

    if (guess === result) {
      score.Wins += 1
      winStreak += 1
      message.textContent = `It was ${result} — You Win!`
      message.style.color = '#00ff88'
      flashBackground('win')
    } else {
      score.Lose += 1
      winStreak = 0
      message.textContent = `It was ${result} — You Lose!`
      message.style.color = '#ff4d4d'
      flashBackground('lose')
    }

    void message.offsetWidth
    message.classList.add('fade-in')

    if (winStreak >= 2) {
      streakEl.textContent = `${winStreak} wins in a row!`
    } else {
      streakEl.textContent = ''
    }

    localStorage.setItem('score', JSON.stringify(score))
    updateScoreBoard()
  }, 800)
}

function flashBackground(type) {
  document.body.classList.remove('win-flash', 'lose-flash')
  void document.body.offsetWidth
  document.body.classList.add(type === 'win' ? 'win-flash' : 'lose-flash')
}

function clearScore() {
  score.Wins = 0
  score.Lose = 0
  winStreak = 0
  localStorage.clear()
  updateScoreBoard()
  document.getElementById('result-message').textContent = ''
  document.getElementById('streak').textContent = ''
  document.getElementById('coin').textContent = '?'
}

function updateScoreBoard() {
  document.getElementById('wins').textContent = score.Wins
  document.getElementById('losses').textContent = score.Lose
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase()
  if (key === 'h') { guess = 'HEADS'; play() }
  if (key === 't') { guess = 'TAILS'; play() }
  if (key === 'c') clearScore()
})
