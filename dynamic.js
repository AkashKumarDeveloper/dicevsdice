const players0El = document.querySelector('.player--0');
const players1E1 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');

let currentScore = 0
let activePlayer = 0
let playing= true
let score = [0 , 0]


function reset(){
  score = [0 , 0]
  activePlayer = 0
  currentScore = 0
  playing= true
  
  document.getElementById('score--0').textContent='0'
  document.getElementById('score--1').textContent='0'
  document.getElementById('current--0').textContent='0'
  document.getElementById('current--1').textContent='0'
}

reset()

function switchPlayer(){
  document.getElementById(`current--${activePlayer}`).textContent='0'
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  // players.forEach(player => player.classList.toggle('player--active'));
  players0El.classList.toggle("player--active")
  players1E1.classList.toggle("player--active")
}


function rollDice(){
  if(playing){
    const diceNumber = Math.floor(Math.random()*6)+1;
    console.log("diceNumber>>>",diceNumber)
  
   // Display dice Roll 
    dice.src=`allDice/dice-${diceNumber}.png`
  
    // Score
    if(diceNumber !== 1){
      console.log("currentScore>>",currentScore)
      console.log("diceNumber>>", diceNumber)
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    } else{
      switchPlayer()
    }
  }
 
}



function hold(){
  if(playing){
    score[activePlayer] +=currentScore 
    document.getElementById(`score--${activePlayer}`).textContent= score[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent= 0;
    if (score[activePlayer] >= 100) {
      document.querySelector(`player--${activePlayer}`).add.classList('player--winner') 
      document.querySelector(`player--${activePlayer}`).remove.classList('player--active') 
      playing = false;
    }else{
      switchPlayer()
    }
  }
}


document.querySelector(".btn--new").addEventListener("click",reset);
document.querySelector(".btn--roll").addEventListener("click",rollDice);
document.querySelector(".btn--hold").addEventListener("click",hold);