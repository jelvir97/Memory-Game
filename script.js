const gameContainer = document.getElementById("game");
const startBtn = document.querySelector('#start');
const okBtn = document.querySelector('#OK');
const gameOverPopUp = document.querySelector('#gameOver');
let scoreKeeper = document.querySelector('.score');
let highScoreKeeper = document.querySelector('.highScore');
const header = document.querySelector('h1');
const body = document.querySelector('body');
let cards;

let card1 = null;
let card2 = null;
let clicker = 0;
let highScore = localStorage.getItem('highScore') || Infinity;
let noClicking = true;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(noClicking) return;
  clicker++;
  if(!card1 || !card2){
    event.target.style.backgroundColor = event.target.classList[0];
    let currentCard = event.target;
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null: currentCard;
  }

  if(card1&&card2){
    noClicking = true
    console.log('two cards chosen')
    if(card1.classList[0] === card2.classList[0]){
      console.log('match!');
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      
      noClicking = false;
    }
    else if(card1.classList[0] !== card2.classList[0]){
      console.log('no match!');
      setTimeout(function(){
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundColor ="white";
        card2.style.backgroundColor ="white";
        card1 = null;
        card2 = null;
        
        noClicking = false;
      },1000)
    }
    
    
    
  }
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  updateScore();
  if(gameEnd()){
    console.log('GAME OVER');
    gameOverPopUp.classList.remove('hide');
    if(clicker< highScore){
      highScore = clicker
      localStorage.setItem("highScore", highScore);
    }
    updateHighScore();
  }

  
}

startBtn.addEventListener('click', function(){
  noClicking = false;
  if(cards){
    for(let x of cards){
      x.remove();
    }
  }
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  cards = document.querySelectorAll('#game div');
  clicker = 0;
  updateScore();
})

function gameEnd(){
  let end = false;
  for(let x of cards){
    if(x.classList[1] === 'flipped'){
      end = true;
    }else{
      end = false;
      return end;
    }
  }
  return end;
}

okBtn.addEventListener('click', function(){
  gameOverPopUp.classList.add('hide');
})

function updateScore(){
    scoreKeeper.remove();
    scoreKeeper = document.createElement('span');
    scoreKeeper.classList.add('score');
    scoreKeeper.innerText = `Score: ${clicker}`
    header.append(scoreKeeper);
}
function updateHighScore(){
  highScoreKeeper.remove();
  highScoreKeeper = document.createElement('h2');
  highScoreKeeper.classList.add('highScore');
  highScoreKeeper.innerText = `High Score: ${highScore}`
  body.append(highScoreKeeper);
}
// when the DOM loads


updateHighScore();




