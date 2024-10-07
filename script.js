'use strict';

// DOM elements
const checkButton = document.querySelector('.btn.check');
const guessInput = document.querySelector('.guess');
const messageDisplay = document.querySelector('.message');
const numberDisplay = document.querySelector('.number');
const againButton = document.querySelector('.btn.again');
const scoreDisplay = document.querySelector('.score');
const highscoreDisplay = document.querySelector('.highscore');
const listCheck = document.getElementById('listCheck');  // Changed to getElementById

// Audio elements for sound effects
const winningSound = document.getElementById('Winning');
const losingSound = document.getElementById('Loosing');
const mistakeSound = document.getElementById('Mistake');

// Game variables
let correctNumber = Math.floor(Math.random() * 20) + 1;  // Random number between 1 and 20
let score = 20;  // Starting score
let highscore = 0;  // Initial highscore
let guessHistory = [];  // Array to store guess history

// Function to display a message
const displayMessage = function(message) {
    messageDisplay.textContent = message;  // Update message display
};

// Reading player's guess and converting it to a number
checkButton.addEventListener('click', function() {
    const userGuess = Number(guessInput.value);  // Convert input to a number

    // Check for invalid input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        mistakeSound.play();  // Play 'mistake' sound
        displayMessage('😡 Please enter a valid number between 1 and 20!');
        guessInput.value = '';
        return;  // Exit the function
    }

    // Push user's guess into the history array
    guessHistory.push(userGuess);

    // Clear the history list and redisplay the updated guess history
    listCheck.innerHTML = "";  // Clear the current list

    // Loop through the guessHistory array and append each guess to the list
    guessHistory.forEach(function(guess) {
        listCheck.insertAdjacentHTML('beforeend', `<li>${guess}</li>`);
    });

    // Clear the input field after each guess
    guessInput.value = '';

    // When the player wins
    if (userGuess === correctNumber) {
        displayMessage('🥳 Correct Number!');
        numberDisplay.textContent = correctNumber;
        document.body.classList.add('gold-background');  // Add gold background
        winningSound.play();

        // Check if the current score is greater than the highscore
        if (score > highscore) {
            highscore = score;  // Update highscore
            highscoreDisplay.textContent = highscore;  // Update highscore display
        }

        // Disable the input field if the user wins
        guessInput.disabled = true;
    } else {
        // If the guess is wrong
        score--;  // Decrease score by 1
        displayMessage(userGuess > correctNumber ? '📈 Too high!' : '📉 Too low!');  // Give feedback

        // Update score display
        scoreDisplay.textContent = score;

        // Check if score is 0 and end the game
        if (score <= 0) {
            displayMessage('😢 Game Over! Click "Again!" to restart.');
            losingSound.play();
            document.body.classList.add('red-background');
            guessInput.disabled = true;  // Disable input if game over
        }
    }
});

// Function to handle "Again!" button click (reset everything)
againButton.addEventListener('click', function() {
    // Reset all values
    score = 20;  // Reset score to 20
    correctNumber = Math.floor(Math.random() * 20) + 1;  // Generate a new correct number
    guessHistory = [];  // Clear guess history

    displayMessage('Start guessing...');
    numberDisplay.textContent = '?';  // Hide the correct number
    guessInput.value = '';  // Clear the input field
    scoreDisplay.textContent = score;  // Update score display
    guessInput.disabled = false;  // Enable input for a new game

    // Clear the guess history display
    listCheck.innerHTML = "";

    // Remove any background colors when resetting
    document.body.classList.remove('gold-background');
    document.body.classList.remove('red-background');
});
