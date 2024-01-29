const red = "red";
const blue = "blue";
const green = "green";
const yellow = "yellow";
const level = "Level ";
const blueA = new Audio("./sounds/blue.mp3");
const greenA = new Audio("./sounds/green.mp3");
const redA = new Audio("./sounds/red.mp3");
const yellowA = new Audio("./sounds/yellow.mp3");
const wrongA = new Audio("./sounds/wrong.mp3");
const colors = [red, blue, green, yellow];

/* inital state */
var highestScore = 0;
var levelNo = 0;
var seq = [];
var userInput = [];

/* Initiate the game */
start();
function start() {
  $(document).keypress(function () {
    $("h1").text(level + levelNo);
    $(document).off("keyup keydown keypress");
    getNewRandomColor();
  });
}

/* Get a new random Color and push to sequence */
function getNewRandomColor() {
    var newColor = colors[nextSequence()];
    userInput = [];
    seq.push(newColor);
    playAudio(newColor);
  }

/* Selects a  new color and handles max score */ 
function nextSequence() {
    if (levelNo > highestScore) {
        highestScore = levelNo;
        $("h2").text("Max Score : " + highestScore);
      }
  levelNo++;
  $("h1").text(level + levelNo);
  var random = Math.floor(Math.random() * colors.length);
  return random;
}

/* button click handler */
var count = -1;
$(".btn").on("click", function (event) {
  count++;
  userInput.push(this.id);
  checkAnswer(count);
  playAudio(this.id);
});

/* Checks if the player sequence matches the actual sequence */
function checkAnswer(currentLevel) {
  if (seq[currentLevel] === userInput[currentLevel]) {
    if (currentLevel + 1 === seq.length) {
      count = -1;
      
      setTimeout(function () {
        getNewRandomColor();
      }, 500);
    }
  } else {
    gameOver();
  }
}

function playAudio(key) {
  buttonAnimation(key);
  switch (key) {
    case blue:
      blueA.currentTime = 0;
      blueA.play();
      break;

    case green:
      greenA.currentTime = 0;
      greenA.play();
      break;

    case red:
      redA.currentTime = 0;
      redA.play();
      break;

    case yellow:
      yellowA.currentTime = 0;
      yellowA.play();
      break;

    default:
      wrongA.currentTime = 0;
      wrongA.play();
  }
}

function buttonAnimation(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function () {
    $("#" + key).removeClass("pressed");
  }, 250);
}

/* Handles game over scenario */
function gameOver() {
  playAudio("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 250);
  $("h1").text("Game Over! Press Any Key to Restart");
  reset();
  start();
}
/* reset to initial settings */
function reset() {
  levelNo = 0;
  seq = [];
  userInput = [];
  count = -1;
}
