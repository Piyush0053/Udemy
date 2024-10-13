// Dice1
var randNumber1= Math.floor(Math.random() * 6)+1;

var changeImage = "images/"+"dice"+ randNumber1 +".png";

document.querySelectorAll("img")[0].setAttribute("src", changeImage);
// Dice2
var randNumber2= Math.floor(Math.random() * 6)+1;

var change2Image = "images/"+"dice"+ randNumber2 +".png";

document.querySelectorAll("img")[1].setAttribute("src", change2Image);

if(randNumber1> randNumber2){
  document.querySelector("h1").innerHTML = "Player 1 wins 🚩";
}
else if(randNumber1 < randNumber2){
  document.querySelector("h1").innerHTML = "Player 2 wins 🚩";
}
else{
  document.querySelector("h1").innerHTML = "Draws🚩";
}

