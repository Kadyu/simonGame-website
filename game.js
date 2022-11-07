var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    
}


function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}


$(document).on("keypress", function(event){

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200) 
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





