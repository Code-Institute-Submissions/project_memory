const moves = document.getElementById("number_of_moves");
const timeValue = document.getElementById("gameTime");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const wrapper = document.querySelector(".wrapper");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

function changeBackgroundYellow() {
  wrapper.style.backgroundColor = "##1a384f";
  document.body.style.backgroundColor = "#0c0c2f";
}

function gameInstruction() {
  var x = document.getElementById("instruction");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const items = [
  { name: "beauty", image: "assets/images/beauty.jpg" },
  { name: "be_happy", image: "assets/images/be_happy.jpg" },
  { name: "nice_kids", image: "assets/images/nice_kids.jpg" },
  { name: "piggypig", image: "assets/images/piggypig.jpg" },
  { name: "be_smart", image: "assets/images/be_smart.jpg" },
  { name: "be_smile", image: "assets/images/be_smile.jpg" },
  { name: "love_snowie", image: "assets/images/love_snowie.jpg" },
  { name: "hey_world", image: "assets/images/hey_world.jpg" },
  
];



let seconds = 0,
  minutes = 0;
let numberOfMoves = 0,
  winCount = 0;


function timeGenerator() {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};


function numberMoves() {
  numberOfMoves += 1;
  moves.innerHTML = `<span>Moves:</span>${numberOfMoves}`;
  
};



function generateRandom(size = 4) {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

function matrixGenerator(cardValues, size = 4) {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before"></div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped", "shake");
        if (!firstCard) {
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          numberMoves();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<div><h3>Well Done!!!</h3>
            <h5> Your moves: ${numberOfMoves}</h5></div>`;
            stopGame();
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped", "shake");
              tempSecond.classList.remove("flipped", "shake");
            }, 900);
          }
        }
      }
    });
  });
};



const startButton = document.getElementById("start");

startButton.addEventListener("click", function() {
  numberOfMoves = 0;
  seconds = 0;
  minutes = 0;
  
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
 
  interval = setInterval(timeGenerator, 1000);
  
  moves.innerHTML = `<span>Moves:</span> ${numberOfMoves}`;
  initializer();
});

stopButton.addEventListener("click", function() {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  });


function initializer() {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};