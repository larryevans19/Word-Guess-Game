//Create an array of teams that will be taking on Tech
$(document).ready(function () {

    var teams = ["Boston College", "Clemson", "Duke", "Florida State", "Louisville",
        "Miami", "North Carolina State", "North Carolina", "Notre Dame", "Pittsburgh",
        "Syracuse", "Virginia", "Virginia Tech", "Wake Forest", "Georgia", "Vanderbilt",
        "Tennessee", "Auburn", "Alabama","Utah","Colorado","UCLA","South Carolina",
        "Maryland", "Purdue"]


    //Create variables needed for the scoreboard
    var wins = 0;
    var losses = 0;
    var guessRemain = 5;
    
    var audioBoo = document.createElement("audio");
    audioBoo.setAttribute("src", "assets/Boo.mp3")

    var audioTech = document.createElement("audio");
    audioTech.setAttribute("src", "assets/GT.mp3");

    //Choose a team from the array that will take on Tech
    var opponent = teams[Math.floor(Math.random() * teams.length)].toUpperCase();
    console.log("Opponent",opponent);
    
    //Create a word which converts the opponent name into a string of blanks to serve as the clue.  
    var guessWord = opponent.replace(/[A-Z]/g, "_")
    console.log("Guess Word: " + guessWord);
    
    //Convert the opponent into an array of blanks
    var oppArray = guessWord.split("");

    //Create a counter of remaining letters in the game word.
    var blanksLeft = (guessWord.length - (guessWord.split(" ").length-1));
    console.log("blanksLeft:",blanksLeft);

    //Display the string of blanks on the game board.
    $("#word").text(guessWord);

    //Ask the player to guess a letter in the opponent name.  Capture the letter guessed on the keyboard.
    //Continue to ask the player to  guess letters until there are no more blanks or until the player

    var letterGuess = document.getElementById("guess");
    
function victory() {
    audioTech.play();
    $("#message").text("TOUCHDOWN GEORGIA TECH!!!");
    $("#continue").text("Press SPACEBAR to keep playing against the next opponent, or ESC to reset the score and start over");
    
}

function defeat(opponent) {
    audioBoo.play();
    $("#message").text("TOUCHDOWN " + opponent);
    $("#continue").text("Press SPACEBAR to keep playing against the next opponent, or ESC to reset the score and start over");
}


function game() {

    document.onkeyup = function (event) {
        letterGuess.textContent = event.key.toUpperCase();
        var letter = letterGuess.textContent
        // console.log("Letter Guess: " + letter);

        //Check to see if the letter guessed matches any of the letters in the blank team name.
        var guessList = document.getElementById("guessList").value;
            console.log("guessList:",document.getElementById("guessList").value);
        
        $("#guessList").append(letter,", ");
                // console.log("Guess Log:",guessLog[0]);
                // for (var z = 0; z < guessLog.length; z++) {
                // console.log("GuessLog:",guessLog[]);
                // $("#usedList").text(guessLog[z]);

        function letterCheck(letter) {
        
            console.log("Opponent: " + opponent);
            console.log("Opp Array: " + guessWord.split(""));
            // var teamArray = opponent.split("");
            // console.log("Team Array: " + teamArray);
      

            var y = opponent.indexOf(letter);
            console.log ("Index of letter: ",opponent.indexOf(letter));
            if (y === -1) {
                guessRemain--;
                    if (guessRemain < 1) {
                        losses += 7;
                        $("#losses").text(losses);
                        console.log("opponent:",opponent)
                        defeat(opponent);

                        //!!!NEED TO TRIGGER A NEW WORD!!!!
                    }
                console.log(guessRemain);
                $("#remaining").text("00:0" + guessRemain);
                //!!!NEED TO TRIGGER A NEW WORD AND RESET GUESS REMAIN!!!!
            }

            for (var l = 0; l < opponent.length; l++) {
                if (letter === opponent[l]) {
                    oppArray[l] = letter;
                    console.log("oppArray Index:",oppArray[l])
                    $("#word").text(oppArray.join(""));
                    blanksLeft--;
                    console.log("blanksLeft:",blanksLeft);
                        if (blanksLeft === 0) {
                            wins += 7;
                            $("#wins").text(wins);
                            victory();
                        }
                }

            }
        }

        //     for (var j = 0; j < oppArray.length; j++) {
        //         if (letterGuess.textContent === teamArray[j]) {
        //             console.log("teamArray:" + teamArray[j]);
        //             console.log("oppArray: " + oppArray[j]);
        //             debugger;
        //             var tempArray[j] = letterGuess.textContent;
        //             console.log("oppArray: " + oppArray[j])
        //             console.log("oppArray.join: " + oppArray.join(""));
        //             // tempArray = oppArray.join(" ")
        //             // console.log("tempArray: " + tempArray[j]);
        //             $("#word").text(oppArray.join(""));
        //             // console.log("tempArray: " + tempArray[j]);
        //             // } else { 
        //             //     for (var j = 0; j < oppArray.length; j++) {
        //             //         if (letterGuess.textContent !== teamArray[j]) {
        //             //         }
        //             //         guessRemain = (teamArray.length);
        //             //         $("#remaining").text("00:0" + guessRemain);
        //         }

        //         console.log("Guess Remain: " + guessRemain);
        //     }
        // }

        letterCheck(letter);
    }

}
    game();

    













    //Loop thru the characters in the destination city to see if the letter guessed matches any of the letters stination city




    //If the letter is a match, change the blank slots to the matched letters guessed by the player.


    //Else reduce the Number of Guesses remaining by 1

    //Write any guessed letters that were not matched into the Letters Already Guessed div


    //If the Number of Guesses Remaining reaches 0, add an L and show L-Train derailed.  Show next word



    //If the destination city is completed, add a win to the win total and show the picture of the destination city in the bottom section show next word

});