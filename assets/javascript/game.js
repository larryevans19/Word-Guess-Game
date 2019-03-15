//Create an array of teams that will be taking on Tech
$(document).ready(function () {

    var teams = ["Boston College", "Clemson", "Duke", "Florida State", "Louisville",
        "Miami", "North Carolina State", "North Carolina", "Notre Dame", "Pittsburgh",
        "Syracuse", "Virginia", "Virginia Tech", "Wake Forest"]


    //Create variables needed for the scoreboard
    var wins = 0;
    var losses = 0;
    var guessRemain = 5;
    var guessLog = [""]

    //Choose a team from the array that will take on Tech
    var opponent = teams[Math.floor(Math.random() * teams.length)].toUpperCase();

    //Create a word which converts the opponent name into a string of blanks to serve as the clue.  
    var guessWord = opponent.replace(/[A-Z]/g, "_")
    console.log("Guess Word: " + guessWord);
    //Convert the opponent into an array of blanks
   
 
    //Display the string of blanks on the game board.
    $("#word").text(guessWord);
    console.log("Guess Word: " + guessWord);

    //Ask the player to guess a letter in the opponent name.  Capture the letter guessed on the keyboard.
    //Continue to ask the player to  guess letters until there are no more blanks or until the player

    var letterGuess = document.getElementById("guess");

    document.onkeyup = function (event) {
        letterGuess.textContent = event.key.toUpperCase();
        console.log("Letter Guess: " + letterGuess.textContent);

    //Check to see if the letter guessed matches any of the letters in the blank team name.

    function letterCheck(letter) {
        var oppArray = guessWord.split("");
        console.log("Opponent: " + opponent);
        console.log("Opp Array: " + guessWord.split(""));
        var teamArray = opponent.split("");
        console.log("Team Array: " + teamArray);

        for (var j = 0; j < oppArray.length; j++) {
            if (letterGuess.textContent === teamArray[j]) {
                console.log("teamArray:" + teamArray[j]);
                console.log("oppArray: " + oppArray[j]);
                // debugger;
                oppArray[j] = letterGuess.textContent;
                console.log("oppArray: " + oppArray[j])
                console.log("oppArray.join: " + oppArray.join(""));
                // tempArray = oppArray.join(" ")
                // console.log("tempArray: " + tempArray[j]);
                $("#word").text(oppArray.join(""));
                // console.log("tempArray: " + tempArray[j]);
            } else { 
                for (var j = 0; j < oppArray.length; j++) {
                    if (letterGuess.textContent !== teamArray[j]) {
                    }
                    guessRemain -= (1 - teamArray.length);
                    $("#remaining").text("00:0" + guessRemain);
                }

                console.log("Guess Remain: " + guessRemain);
            }
        }
    }

    letterCheck(letterGuess.textContent);
    

    }
 

  








//Loop thru the characters in the destination city to see if the letter guessed matches any of the letters stination city




//If the letter is a match, change the blank slots to the matched letters guessed by the player.


//Else reduce the Number of Guesses remaining by 1

//Write any guessed letters that were not matched into the Letters Already Guessed div


//If the Number of Guesses Remaining reaches 0, add an L and show L-Train derailed.  Show next word



//If the destination city is completed, add a win to the win total and show the picture of the destination city in the bottom section show next word

});