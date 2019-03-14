//Create an array of colleges where the L-Train could be headed

var colleges = ["Boston College","Clemson","Florida State","Georgia Tech","Louisville",
                "Miami","North Carolina State","North Carolina","Notre Dame","Pittsburgh",
                "Syracuse","Virginia","Virginia Tech","Wake Forest"]

//Create variables needed for game

var guessRemaining = 5;
var wins = 0;
var losses = 0;
var guessWord = destination
var guessLog = [""]


//Choose a city from the array that is the L-Train's destination
var destination = colleges[Math.floor(Math.random() * colleges.length)].toUpperCase();

//Convert the destination into the string of blanks

for (var i = 0; i < destination.length; i++) {

    if (destination.charAt(0) !== "a" ) {
        var guessWord = destination.replace(/[A-Z]/g,"_");
    }
}



//Display the blank word with the same number of characters as the destination city
$(document).ready(function() {

$("#word").text(guessWord);

//Ask the player to guess a letter in the destination city.  Continue to ask the player to
//guess letters until there are no more blanks or until the player misses 5 letters and the game is over

var letterGuess = document.getElementById("guess");

document.onkeyup = function(event) {
    letterGuess.textContent = event.key.toUpperCase();

for (var j = 0; j < destination.length; j++) {
    if (letterGuess.textContent === destination[j]) {
        var newLocal = guessWord.replace(j, letterGuess.textContent);
        $("#word").text(newLocal);
        console.log(letterGuess.textcontent)
    }

}

}
});





//Loop thru the characters in the destination city to see if the letter guessed matches any of the letters stination city




//If the letter is a match, change the blank slots to the matched letters guessed by the player.


//Else reduce the Number of Guesses remaining by 1

//Write any guessed letters that were not matched into the Letters Already Guessed div


//If the Number of Guesses Remaining reaches 0, add an L and show L-Train derailed.  Show next word



//If the destination city is completed, add a win to the win total and show the picture of the destination city in the bottom section show next word


