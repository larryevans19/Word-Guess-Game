$(document).ready(function () {

    //Create an array of major college football teams that will be taking on Tech
    //in the game rounds.
    var teams = ["Boston College", "Clemson", "Duke", "Florida State", "Louisville",
        "Miami", "North Carolina State", "North Carolina", "Notre Dame", "Pittsburgh",
        "Syracuse", "Virginia", "Virginia Tech", "Wake Forest", "Georgia", "Vanderbilt",
        "Tennessee", "Auburn", "Alabama", "Utah", "Colorado", "UCLA", "South Carolina",
        "Maryland", "Purdue", "Oregon", "Stanford", "California", "Southern Cal",
        "Arizona", "Arizona State", "Baylor", "Penn State", "Louisiana State", "Florida",
        "Central Florida", "Temple", "Kansas", "Iowa", "Iowa State", "Kansas State",
        "Boise State", "Colorado State", "Ohio State", "Connecticut", "Rutgers", "Army",
        "Navy", "Air Force", "West Virginia", "Southern Methodist", "Texas", "Tulane",
        "Ole Miss", "Mississippi State", "Kentucky", "Memphis", "Tulsa", "Northwestern",
        "Nebraska", "South Florida", "East Carolina", "Cincinnati", "Texas Christian",
        "Texas Tech", "Wisconsin", "Brigham Young", "Fresno State", "UNLV", "Missouri",
        "Washington", "Washington State", "Oregon State", "Indiana", "Illinois",
        "Minnesota", "Michigan", "Michigan State", "Georgia State"]

    //Create global variables needed for the scoreboard and game functions.
    var wins = 0;
    var losses = 0;
    var guessRemain = 5;
    var opponent = "";
    var oppArray = [];
    var blanksLeft = 10
    var guessWord = "";

    var letterGuess = document.getElementById("guess");
    var wasGuessed = false;

    var audioBoo = document.createElement("audio");
    audioBoo.setAttribute("src", "assets/Boo.mp3")

    var audioTech = document.createElement("audio");
    audioTech.setAttribute("src", "assets/GT.mp3");

    var audioRef = document.createElement("audio");
    audioRef.setAttribute("src", "assets/Ref.mp3");

    //GAME FUNCTIONS

    //PREGAME function sets the stage for the game.  It chooses the opponent word that
    //will be played in the first round, creates the string of blanks that match the 
    //number of characters in the game word and displays the string of blanks on the game
    // screen. It also creates an array out of the string of blanks that the game loops
    //through to check for guess matches and updates the applicable array indices.  It also
    //defines the variable that counts how many blanks are remaining in the game word and
    //accounts, which alos accounts for the fact that some opponent words are actually multiple
    //words with spaces (that was tricky!).
    function preGame() {
        // console.log("PREGAME!");
        //Choose a team from the array that will take on Tech
        opponent = teams[Math.floor(Math.random() * teams.length)].toUpperCase();
        // console.log("Opponent", opponent);

        //Create a word which converts the opponent name into a string of blanks to serve as the clue.  
        guessWord = opponent.replace(/[A-Z]/g, "_");
        // console.log("Guess Word: " + guessWord);

        //Convert the opponent into an array of blanks
        oppArray = guessWord.split("");

        //Create a counter of remaining letters in the game word.
        blanksLeft = (guessWord.length - (guessWord.split(" ").length - 1));
        console.log("blanksLeft:", blanksLeft);

        //Display the string of blanks on the game board.
        $("#word").text(guessWord);
    }

    //LETTERCHECK function first checks the game input letter to first see if it part of
    //the game word.  If it is not part of the game word, it reduces the remaining guesses,
    //and if remaining guesses hits 0 it gives the opponent 7 points for a touchdown, and
    //calls the DEFEAT function to end the round. If the guessed letter is part of the game
    //word, it loops through the array of the game characters and updates the blanked to show
    //matched letters.  If all the letters are matched and the blanks counter reaches 0, the 
    //game gives Tech a touchdown on the scoreboard and calls the VICTORY function to end the
    //round.   

    function letterCheck(letter) {

        // console.log("Opponent: " + opponent);
        // console.log("Opp Array: " + guessWord.split(""));

        //This variable captures the letters in the Guess List that we will use
        //to see if a matched letter has already been played in the round.
        var g = $("#guessList").text();

        // console.log("GUESS VAL CHECK:", $("#guessList").text());
        // console.log("VAR G:", g);
        // console.log("G LENGTH:", g.length);
        // console.log("GUESS SEARCH CHECK:", g.search(letter));

        // var gSearch= g.search(letter)
        // console.log("GUESS SEARCH CHECK:",$("#guessList").search(letter));
        //Check to see if the guessed letter is NOT in the game word. 
        var y = opponent.indexOf(letter);
        console.log("letter:", letter);
        console.log("letter.keyCode:", event.keyCode)
        console.log("Index of letter: ", opponent.indexOf(letter));
        if ((y === -1) && (65 <= event.keyCode && event.keyCode <= 90)) {
            guessRemain--;
            if (guessRemain < 1) {
                losses += 7;
                $("#losses").text(losses);
                // console.log("opponent:", opponent)
                defeat(opponent);
            }
            console.log(guessRemain);
            $("#remaining").text("00:0" + guessRemain);
        }

        //If the guessed letter is in the game word, loop through the array
        //of characters to determine which positions the guessed letter is located,
        //then update those letters.  If there are no remaining letters to identify,
        //gives GT a TD (7 points) on the scoreboard and triggers the VICTORY function.
        for (var l = 0; l < opponent.length; l++) {
            if (letter === opponent[l]) {
                oppArray[l] = letter;
                // console.log("oppArray Index:", oppArray[l])
                $("#word").text(oppArray.join(""));
                // console.log("G-SEARCH LETTER,G-LENGTH -3:", g.search(letter), ", ", (g.length - 3));
                // //This IF statement checks the Letters Guessed ID to see if a matched letter
                //has already been guessed.  The Blanks Left counter is not reduced if a 
                //matched letter was already guessed.  This keeps the player from winning
                //too early by matching letters that were already matched.
                if (g.search(letter) >= (g.length - 3)) {
                    blanksLeft--;
                }
                console.log("blanksLeft:", blanksLeft);
                if (blanksLeft === 0) {
                    wins += 7;
                    $("#wins").text(wins);
                    victory();
                }
            }

        }
    }

    //VICTORY function is triggered after the player wins the current round.
    //It reloads the winning audio file (so that it always starts from the beginning)
    //and displays the winning jumbotron message.  It also gives player choices
    //to conintue the game using the current score or to reset the score depending
    //on key entry.  It then calls the NEXTOPPONENT function.
    function victory() {
        audioTech.load();
        audioTech.play();
        $("#message").text("TOUCHDOWN GEORGIA TECH!!!");
        $("#continue").text("Press ENTER to keep playing against the next opponent, or ESC to reset the score and start over");
        document.onkeyup = function (v) {
            console.log("keyCode", v.keyCode);
            if (v.keyCode === 27) {
                wins = 0;
                $("#wins").text(wins);
                losses = 0;
                $("#losses").text(losses);
                nextOpponent();
            } else if (v.keyCode === 13) {
                nextOpponent()
            }
        }
    }

    //DEFEAT function is triggered after the player loses the current round.
    //It plays the losing audio and jumbotron message and gives player choices
    //to conintue the game using the current score or to reset the score depending
    //on key entry.  It then calls the NEXTOPPONENT function.
    function defeat(opponent) {
        audioBoo.load();
        audioBoo.play();
        $("#message").text("TOUCHDOWN " + opponent);
        $("#continue").text("Press ENTER to keep playing against the next opponent, or ESC to reset the score and start over");
        document.onkeyup = function (v) {
            console.log("keyCode", v.keyCode);
            if (v.keyCode === 27) { //ESCAPE entry resets score
                wins = 0;
                $("#wins").text(wins);
                losses = 0;
                $("#losses").text(losses);
                nextOpponent();
            } else if (v.keyCode === 13) { //SPACE BAR entry continues score
                nextOpponent()
            }
        }
    }

    //NEXTOPPONENT function sets up the game for another round. It stops
    //the current audio, resets the remaining guesses on the scoreboard,
    //and selects the next opponent that will be played. It also clears the
    //victory or defeat messages from the jumbotron, then calls the main game
    //function to start the next round.
    function nextOpponent() {
        audioTech.pause();
        guessRemain = 5;
        $("#remaining").text("00:0" + guessRemain);
        opponent = teams[Math.floor(Math.random() * teams.length)].toUpperCase();
        // console.log("Opponent", opponent);
        $("#guess, #guessList, #message, #continue").empty();
        //replace all letters with blanks (keep any spaces in game word)
        guessWord = opponent.replace(/[A-Z]/g, "_");
        $("#word").text(guessWord);
        game();
    }

    //INTRO function displays the game intro screen with game instructions and
    //asks player to press any key to start.  Key entry causes intro screen to hide
    //and the game screen to show. Then calls the main game function to start play.
    function intro() {
        document.onkeyup = function (event) {
            $(".intro").hide();
            $(".play").show();
            game();
        }
    }

    //ISLETTER function takes the key event to determine if the player entered a number.
    //If the player didn't enter a number, it blows the referee's whistle and throws a
    //message to the jumbotron.
    function isLetter(event) {
        if (event.keyCode < 65 || event.keyCode > 90) {
            console.log("isLetter keyCode:", event.keyCode);
            audioRef.play();
            $("#guessAlert").text("YOUR GUESS IS NOT A LETTER! CHOOSE A LETTER NOT SHOWN ABOVE")
        }
    }

    //MAIN GAME FUNCTION.  It first calls the PREGAME function to set up the opponent
    //game word.  Then it takes the input letter guessed by the player, stores it in
    //the variable, and calls the LETTERCHECK function to see if the guessed letter
    //is a match to the game word.
    function game() {
        preGame();
        document.onkeyup = function (event) {
            letterGuess.textContent = event.key.toUpperCase();
            var letter = letterGuess.textContent;
            //These last 2 variables are used to test whether the key entry was a LETTER
            var letterCode = event.which || event.keyCode;
            var letterStr = String.fromCharCode(letterCode);

            //This variable captures the letters in the Guess List that we will use
            //to see if a matched letter has already been played in the round.
            var d = $("#guessList").text();

            //Check to see if hte key event was a letter.  If  non-letter was entered, blows
            //the referee's whistle.

            isLetter(event);

            //This IF statement checks to see if the guessed letter has already been chosen by
            //the Guess List. If the letter has already been guessed, an alert is posted on the
            //scoreboard telling the player the letter has already been guessed and to pick a
            //different letter.  It also blows the referees whistle to alert the player!

            if ((d.search(letter) !== -1) && d.length >= 3) {
                audioRef.play();
                $("#guessAlert").text("ALREADY GUESSED! CHOOSE A LETTER NOT SHOWN ABOVE!")
            }
            // console.log("D-SEARCH, D-LENGTH, D-LENGTH - 3:", d.search(letter), ", ", d.length, ", ", (d.length - 3));

            //This IF statement only adds the key entry to the Guess Letter list on the
            //scoreboard and calls the LETTERCHECK function if the key entry by the
            //player was a LETTER. So the game won't penalize the player if they guess a number or
            //other key like spacebar, backspace, or shift.
            if ((d.search(letter) === -1 && (event.keyCode > 65 && event.keyCode < 90)) || (d.search(letter) >= (d.length - 2))) {
                $("#guessAlert").empty();
                if (/[a-zA-Z]/i.test(letterStr)) {
                    $("#guessList").append(letter, ", ");
                    console.log("Event Test:", (/[a-zA-Z]/i.test(letterStr)))
                    console.log("letterStr:", letterStr)
                }
                letterCheck(letter);
            }
        }
    }


    //INTRO is the first function called in the game.  This is the game intro screen.
    //The game jumbotron screen is hidden in the base HTML.  The player's first key entry
    //hides the intro screen and shows the game screen to begin the action. 
    intro();


});
