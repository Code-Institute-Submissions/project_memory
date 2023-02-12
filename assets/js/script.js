const moves = document.getElementById("number_of_moves");
const timeValue = document.getElementById("gameTime");
const startButton = document.getElementById("start");

function gameInstruction() {
    var x = document.getElementById("instruction");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
  }

  const items = [
    { name: "be_happy", image: "assets/images/be_happy.jpg" },
    { name: "be_smart", image: "assets/images/be_smart.jpg" },
    { name: "be_smile", image: "assets/images/be_smile.jpg" },
    { name: "hey_world", image: "assets/images/hey_world.jpg" },
    { name: "love_snowie", image: "assets/images/love_snowie.jpg" },
    { name: "nice_kids", image: "assets/images/nice_kids.jpg" },
    { name: "piggypig", image: "assets/images/piggypig.jpg" },
    { name: "beauty", image: "assets/images/beauty.jpg" },
  ]
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
    timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};

function numberMoves() {
    numberOfMoves +=1;
    moves.innerHTML = `<span>Moves: </span>${numberOfMoves}`;
};

function generateRandom() 

function matrixGenerator()

function startButton() 
startButton.addEventListener("click", () => {
    movesCount = 0;
    seconds = 0;
    minutes = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = `<span>Moves: </span> ${movesCount}`;
    initializer();
});

function stopButton() 
stopButton.addEventListener(
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);

function initializer() 