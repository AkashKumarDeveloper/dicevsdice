document.addEventListener('DOMContentLoaded', function () {
  const players = document.querySelectorAll('.player');
  const playerScores = [0, 0];
  let activePlayer = 0;
  let currentScore = 0;
  let gamePlaying = true;

  function init() {
    playerScores.forEach((score, index) => {
      document.getElementById(`score--${index}`).textContent = '0';
      document.getElementById(`current--${index}`).textContent = '0';
    });
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    players.forEach(player => player.classList.remove('player--winner'));
    players[activePlayer].classList.add('player--active');
    document.querySelector('.dice').classList.remove('hidden');
  }

  function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    players.forEach(player => player.classList.toggle('player--active'));
  }

  function rollDice() {
    if (gamePlaying) {
      const dice = Math.floor(Math.random() * 6) + 1;
      const diceElement = document.querySelector('.dice');
      diceElement.src = `allDice/dice-${dice}.png`;
      diceElement.classList.remove('hidden');

      if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      } else {
        switchPlayer();
      }
    }
  }

  function hold() {
    if (gamePlaying) {
      playerScores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = playerScores[activePlayer];
      if (playerScores[activePlayer] >= 100) {
        document.getElementById(`name--${activePlayer}`).textContent = 'Winner!';
        players[activePlayer].classList.add('player--winner');
        document.querySelector('.dice').classList.add('hidden');
        gamePlaying = false;
      } else {
        switchPlayer();
      }
    }
  }

  document.querySelector('.btn--new').addEventListener('click', init);
  document.querySelector('.btn--roll').addEventListener('click', rollDice);
  document.querySelector('.btn--hold').addEventListener('click', hold);

  init();
});
