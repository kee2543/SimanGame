var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

$("#level-title").text("Press a key to start");

$(document).on("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    if (started) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        makeSound(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    } else {
        startOver();
        $("#level-title").text("Game Over, Press any key to restart");
        var wrong = "wrong";
        makeSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    makeSound(randomChosenColor);
}

function animatePress(buttonPressed) {
    $("#" + buttonPressed).fadeIn(100).fadeOut(100).fadeIn(100);
}

function makeSound(buttonPressed) {
    var audio = new Audio("sounds/" + buttonPressed + ".mp3");
    audio.play()
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}