const readlineSync = require('readline-sync');

function getName() {
    const name = readlineSync.question('What is your name? ');
    console.log("Hello " + name);
}

function getMaxFromUser() {
    let number = Number(readlineSync.questionInt('Choose a number: ', {limitMessage:'That is invalid.'}));
    return number;
}

function generateRandomNumber(number) {
    let max = Math.floor(number);
    let randomNum = Math.floor(Math.random() * (max));
    return randomNum;
}

function getGuessFromUser(randomNum, number) {
    console.log("Great!  Let's Play!");
    let guess = Number(readlineSync.questionInt("Guess a number between 0 and " + number + ": ", {limitMessage:'That is invalid.'}));
    return guess;
}

function isGuessCorrect(guess, randomNum) {
    if (guess > randomNum) {
        console.log("Too high!");
        return false;
    } 
    else if (guess < randomNum) {
        console.log("Too low!");
        return false;
    } 
    else {
        return true;
    }
}

function playAgain(randomNum) {
    console.log("Correct!  The number was " + randomNum + ".");
    let playAnswer = readlineSync.keyInYNStrict("Would you like to play again? ");
    if (playAnswer === true) {
        return true;
    } 
    else {
        console.log("Thanks for playing.");
        return false;
    }
}

function startGame() {
    getName();
    gameLoop();
    function gameLoop() {
        let Max = getMaxFromUser();
        if (Max !== 0) {
            let rnd = generateRandomNumber(Max);
            let userGuess = getGuessFromUser(rnd, Max);
            let guessCorrect = false;
            while (!isGuessCorrect(userGuess, rnd)) {
                userGuess = Number(readlineSync.questionInt("Try again: ", {limitMessage:'That is invalid.'}));
            }
            if (playAgain(rnd)) {
                gameLoop();
            }
        }
    }
}

startGame();