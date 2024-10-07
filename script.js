'use strict';

// DOM elementer
const checkButton = document.querySelector('.btn.check');
const guessInput = document.querySelector('.guess');
const messageDisplay = document.querySelector('.message');
const numberDisplay = document.querySelector('.number');
const againButton = document.querySelector('.btn.again');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');

// Audio elementer for lyd effekter
const winningSound = document.getElementById('Winning');
const losingSound = document.getElementById('Loosing');
const mistakeSound = document.getElementById('Mistake');

// Spil variabeler
let correctNumber = Math.floor(Math.random() * 20) + 1;  // Random nummer mellem 1 og 20
let score = 20;  // Starting score
let highscore = 0;  // Initial highscore

// Function som logger ud en besked
const displayMessage = function(message) {
    messageDisplay.textContent = message;  // Updater besked displayet
};

// Læser spilleren svar og konvertere det til nummer
checkButton.addEventListener('click', function() {
    const userGuess = Number(guessInput.value); //Konvertere input som nummer

    // Tjek for forkert input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        mistakeSound.play();  // Spil 'mistake' lyd
        displayMessage('😡 Please enter a valid number between 1 and 20!');
        guessInput.value = '';
        return;  // Log ud functionen
    }

    // Når spilleren vinder
    if (userGuess === correctNumber) {
        displayMessage('🥳 Correct Number!');
        numberDisplay.textContent = correctNumber;
        document.body.classList.add('gold-background'); //Tilføj guldbaggrunden
        winningSound.play();

        // Check if the current score is greater than the highscore
        if (score > highscore) {
            highscore = score;  // Update highscore
            highscoreDisplay.textContent = highscore;  // Update highscore display
        }

        // Ryd input fæltet hvis man vinder
        guessInput.value = '';
    } else {
        // Hvis gættet er forkert
        score--;  // Decrease score by 1
        displayMessage(userGuess > correctNumber ? '📈 Too high!' : '📉 Too low!');  // Giver feedback
        guessInput.value = '';  // Ryd inputfæltet

        // Opdater score display
        scoreDisplay.textContent = score;

        // Tjek scoren er 0 og skriv at spillet er slut
        if (score <= 0) {
            displayMessage('😢 Game Over! Click "Again!" to restart.');
            losingSound.play();
            document.body.classList.add('red-background');
            guessInput.disabled = true;  // Disable input if game over
        }
    }
});

// Functionen som arbejder med Again! button click (reset everything)
againButton.addEventListener('click', function() {
    // Reset alle værdier
    score = 20;  // Reset scoren til 20
    correctNumber = Math.floor(Math.random() * 20) + 1;  // Generate spillet til at vælge et nyt nummer

    displayMessage('Start guessing...');
    numberDisplay.textContent = '?';  //Gemmer det rigtige nummer
    guessInput.value = '';  //ryder inputfæltet
    scoreDisplay.textContent = score;  //Update scoren
    highscoreDisplay.textContent = highscore;
    guessInput.disabled = false; // Aktiver input til et nyt spil

    // Fjern guldbaggrund når man trykker 'Again'
    document.body.classList.remove('gold-background');
    document.body.classList.remove('red-background');
});
