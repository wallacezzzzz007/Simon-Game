// basic settings
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var level = 0;

// main body
$(document).keypress(function () {
  if (startGame === false) {
    startGame = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

// detecting button click
$(".btn").on("click", function (event) {
  let userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress($(this));
  checkAnswer(userClickedPattern.length - 1);
});

// add new challenge
function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(50)
    .fadeIn(50);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

// play sound func
function playSound(name) {
  let colorSound = new Audio("sounds/" + name + ".mp3");
  colorSound.play();
}

// press animation
function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(() => {
    currentColour.removeClass("pressed");
  }, 100);
}

// check answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel + 1 === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    gameOver();
  }
}

// game over
function gameOver() {
  level = 0;
  gamePattern = [];
  startGame = false;
  userClickedPattern = [];
}
