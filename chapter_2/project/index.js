const readlineSync = require('readline-sync');

function startGame() {
    const name = readlineSync.question('What is your name? ');
    console.log("Hello " + name);
    getMaxFromUser();
}

startGame();



function getMaxFromUser() {
    let number = new Number(readlineSync.question('Choose a number: '));
    if (isNaN(number)) {
        console.log("That's not a number!");
        getMaxFromUser();
    }
    else if (number == 0) {
        console.log("The number cannot be 0.");
        getMaxFromUser();
    }
    else {
        console.log("Great!  Let's Play!");
        generateRandomNumber(number);
    }

    function generateRandomNumber(number) {
        let max = Math.floor(number);
        let randomNum = Math.floor(Math.random() * (max));
        getGuessFromUser(randomNum);

        function getGuessFromUser(randomNum) {
            let guess = new Number(readlineSync.question("Guess a number between 0 and " + number + ": "));
            isGuessCorrect(guess);

            function isGuessCorrect(guess) {
                while (guess !== randomNum) {

                    if (guess > randomNum) {
                        console.log("Too high!");
                        guess = new Number(readlineSync.question("Try again: "));
                    } 
                    else if (guess < randomNum) {
                        console.log("Too low!");
                        guess = new Number(readlineSync.question("Try again: "));
                    } 
                    else if (isNaN(guess)) {
                        console.log("That's not a number!");
                        getGuessFromUser(randomNum);
                    }
                    else {
                        console.log("Correct!  The number was " + randomNum + ".\nThanks for playing.");
                        let playAgain = readlineSync.keyInYNStrict("Would you like to play again? ");
                        if (playAgain === true) {
                            getMaxFromUser();
                        }
                        else {
                            guess === randomNum;
                            return;
                        }
                        // if (playAgain === 'yes' || playAgain === "Yes" || playAgain === 'y' || playAgain === 'Y') {
                        //     getMaxFromUser();
                        // } 
                        // else if (playAgain === 'no' || playAgain === "No" || playAgain === 'n' || playAgain === 'N') {
                        //     console.log("Thanks for playing.");
                        //     guess = randomNum;
                        //     break;
                        // }
                        // else {
                        //     console.log("I don't understand.  Please enter y, Y, yes or Yes to play again, or n, N, no or No to exit.");
                        //     playAplayAgain = readlineSync.question("Would you like to play again? ");
                        //     continue;
                        // }
                    }
                }
            }
        }
    }
}