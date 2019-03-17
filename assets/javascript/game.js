//Create an array of teams that will be taking on Tech
$(document).ready(function () {

    var teams = ["Boston College", "Clemson", "Duke", "Florida State", "Louisville",
        "Miami", "North Carolina State", "North Carolina", "Notre Dame", "Pittsburgh",
        "Syracuse", "Virginia", "Virginia Tech", "Wake Forest", "Georgia", "Vanderbilt",
        "Tennessee", "Auburn", "Alabama", "Utah", "Colorado", "UCLA", "South Carolina",
        "Maryland", "Purdue", "Oregon", "Stanford", "California", "Southern Cal",
        "Arizona", "Arizona State", "Baylor", "Penn State", "Louisiana State", "Florida",
        "Central Florida", "Temple", "Kansas", "Iowa", "Kansas State", "Boise State",
        "Washington", "Washington State", "Oregon State", "Indiana", "Illinois",
        "Minnesota", "Michigan", "Michigan State"]


    //Create global variables needed for the scoreboard and game
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

    function preGame() {
        console.log("PREGAME!");
        //Choose a team from the array that will take on Tech
        opponent = teams[Math.floor(Math.random() * teams.length)].toUpperCase();
        console.log("Opponent", opponent);

        //Create a word which converts the opponent name into a string of blanks to serve as the clue.  
        guessWord = opponent.replace(/[A-Z]/g, "_");
        console.log("Guess Word: " + guessWord);

        //Convert the opponent into an array of blanks
        oppArray = guessWord.split("");

        //Create a counter of remaining letters in the game word.
        blanksLeft = (guessWord.length - (guessWord.split(" ").length - 1));
        console.log("blanksLeft:", blanksLeft);

        //Display the string of blanks on the game board.
        $("#word").text(guessWord);
    }

    function letterCheck(letter) {

        console.log("Opponent: " + opponent);
        console.log("Opp Array: " + guessWord.split(""));

        var y = opponent.indexOf(letter);
        console.log("Index of letter: ", opponent.indexOf(letter));
        if (y === -1) {
            guessRemain--;
            if (guessRemain < 1) {
                losses += 7;
                $("#losses").text(losses);
                console.log("opponent:", opponent)
                defeat(opponent);

                //!!!NEED TO TRIGGER A NEW WORD!!!!
            }
            console.log(guessRemain);
            $("#remaining").text("00:0" + guessRemain);
        }

        for (var l = 0; l < opponent.length; l++) {
            if (letter === opponent[l]) {
                oppArray[l] = letter;
                console.log("oppArray Index:", oppArray[l])
                $("#word").text(oppArray.join(""));
                blanksLeft--;
                console.log("blanksLeft:", blanksLeft);
                if (blanksLeft === 0) {
                    wins += 7;
                    $("#wins").text(wins);
                    victory();
                }
            }

        }
    }

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

    function defeat(opponent) {
        audioBoo.load();
        audioBoo.play();
        $("#message").text("TOUCHDOWN " + opponent);
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

    function nextOpponent() {
        audioTech.pause();
        guessRemain = 5;
        $("#remaining").text("00:0" + guessRemain);
        opponent = teams[Math.floor(Math.random() * teams.length)].toUpperCase();
        console.log("Opponent", opponent);
        $("#guessList, #message, #continue").empty();
        guessWord = opponent.replace(/[A-Z]/g, "_");
        $("#word").text(guessWord);
        game();
    }

    function intro() {
        document.onkeyup = function (event) {
            $(".intro").hide();
            $(".play").show();
            game();
        }
    }

    function game() {
        preGame();
        document.onkeyup = function (event) {
            letterGuess.textContent = event.key.toUpperCase();
            var letter = letterGuess.textContent

            var c = document.getElementById("guessList").valueOf(letter);
            console.log("Index Test", document.getElementById("guessList").valueOf(letter));

            $("#guessList").append(letter, ", ");
            console.log("guessList:", document.getElementById("guessList").valueOf());

            letterCheck(letter);

        }
    }

    intro();
});