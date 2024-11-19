// step 1
let buttonColours=["red", "blue", "green", "yellow"];


let gamePattern =[];

let userClickedPattern =[];

var started = false;
var level=0;

$(document).keypress (function(){
    
    if(!started){
    $("#level-title").html("Level "+ level);
    nextSequence();
    started= true;
}

});  

// step 2
function nextSequence(){
    level++;
    
    $("#level-title").html("Level "+ level);

    var randomNum = Math.floor(Math.random()* 3)+1;

    var randomChosenColour = buttonColours[randomNum];

    gamePattern.push(randomChosenColour);

    //  Animate the chosen color
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // play sound of the chosen color
    playSound(randomChosenColour);
}
$(".btn").click( function() {
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
  animatePress(userChosenColour);   
});

// function PlaySound()
function playSound(name){

    var audio = new Audio("sounds\\"+name+".mp3");
    audio.play();
    
}

// Animate Sound

function animatePress(currentColour){
    $("#"+ currentColour ).addClass('pressed').delay(100).removeClass('pressed');                               
}


