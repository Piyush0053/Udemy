// n= defining the size for the loop
// .drum represents the class name drum.

// Detecting Touch press
var n= document.querySelectorAll(".drum").length;

for(var i=0;i<n;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function() {
        var takingTouchButton = this.innerHTML;
        makesound(takingTouchButton);
    });
}

// Detecting Keyboard Press
document.addEventListener("keydown", (event)=>{
    makesound(event.key);
});

// Playing Sound

function makesound(key){
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
    
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
    
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
    
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "l":
            var bass = new Audio("sounds/crash.mp3");
            bass.play();
            break;
        case "k":
            var crash = new Audio("sounds/kick-bass.mp3");
            crash.play();
            break;
        default: console.log(takingInputButton);
         
    }
}
