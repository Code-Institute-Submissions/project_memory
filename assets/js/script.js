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

// Background's colors
function changeBackgroundYellow() {
  wrapper.style.backgroundColor = "yellow";
  document.body.style.backgroundColor = "#253431";
  document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/autumn-landscape-with-swamp-forest_107791-4624.jpg?w=1380&t=st=1676635346~exp=1676635946~hmac=95f4739b27d12c7c68acb06539af0b34088dcaaf025b9d48de4a1028a0af3b1d')";
}

function changeBackgroundBlue() {
  wrapper.style.backgroundColor = "#1a384f";
  document.body.style.backgroundColor = "#0c0c2f";
  document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/woman-girl-summer-camp-night_107791-11572.jpg?w=1380&t=st=1676635454~exp=1676636054~hmac=8c961b42435a3793f592eadf687dc846ce5ee5c12e098d8803a667aa0420ed7e')";
}

function changeBackgroundGrey() {
  wrapper.style.backgroundColor = "rgb(41, 42, 52)";
  document.body.style.backgroundColor = "#0c0c2f";
  document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/night-forest-with-camp-fire-river-mountains_107791-6993.jpg?w=1380&t=st=1676633073~exp=1676633673~hmac=0f1969a485bee8d91bb929af0a58aaf57762936a000c2d680488f9438515f371')";
}

function changeBackgroundWhite() {
  wrapper.style.backgroundColor = "snow";
  document.body.style.backgroundColor = "rgb(6, 10, 50)";
  document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/air-balloons-flying-night-starry-sky-with-full-moon-clouds-lake-with-rocks-conifers-trees-aerial-flight-travel-midnight-scenery-landscape-cartoon-vector-illustration-background_107791-8369.jpg?w=1380&t=st=1676038931~exp=1676039531~hmac=5fb692cc6054ff94e2e3bdb88ea8a3a362c1e7c99c01f67176b364d84c0c381f')";
}

// Instruction
function gameInstruction() {
  var x = document.getElementById("instruction");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Pictures to the cards
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

// Install time
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

// Moves
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
              result.innerHTML = `<h3>Well Done!!!</h3>
            <h4> Your moves: ${numberOfMoves}</h4>`;
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


// start game
const startButton = document.getElementById("start");

startButton.addEventListener("click", function() {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
 
  interval = setInterval(timeGenerator, 1000);
  
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

// Stop Game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
  );


function initializer() {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};