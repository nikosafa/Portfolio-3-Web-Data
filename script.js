'use strict';

// DOM elements, and there different ussage.
const checkButton = document.querySelector('.btn.check'); // Button to check the guess
const guessInput = document.querySelector('.guess'); // Input field for user's guess
const messageDisplay = document.querySelector('.message'); // Area to display messages to the user
const numberDisplay = document.querySelector('.number'); // Area to display the correct number
const againButton = document.querySelector('.btn.again'); // Button to restart the game
const scoreDisplay = document.querySelector('.score'); // Display for the number of tries left
const highscoreDisplay = document.querySelector('.highscore'); // Display for the high score
const listCheck = document.getElementById('listCheck'); // List to show the history of guesses



// Audio elements for sound effects
//Link for notes: https://www.w3schools.com/jsref/met_audio_play.asp
const winningSound = document.getElementById('Winning');
const losingSound = document.getElementById('Loosing');
const mistakeSound = document.getElementById('Mistake');



// Game variables
//Link for notes: https://www.w3schools.com/jsref/jsref_random.asp
let correctNumber = Math.floor(Math.random() * 20) + 1; // Generate a random number between 1 and 20
let score = 10; // The starting score, which is the number of tries left
let highscore = 0; // The first high score, when the game has not been played
let guessHistory = []; // Array to store the history of guesses



// Function to display a message,
const displayMessage = function(message) {
    messageDisplay.textContent = message;
};



// Update the score display function, so that it shows the current number of tries left
const updateScoreDisplay = function() {
    scoreDisplay.textContent = score;
};



// Initialize game. This calls the function, so that the initial tries is 10
updateScoreDisplay();



// This reads the player's guess and converts it into a number
checkButton.addEventListener('click', function() {
    const userGuess = Number(guessInput.value);

    // Check for invalid input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        mistakeSound.play();
        displayMessage('😡 Please enter a valid number between 1 and 20!');
        guessInput.value = ''; //This clears the input field
        return; // Exit the function to stop further processing
    }

    // This push the players input into the history array
    guessHistory.push(userGuess);

    // This clears the history list, and display the updated guess history
    listCheck.innerHTML = "";

    //This loops through the guessHistory array, which iterates the array, and it adds each guess to the list
    guessHistory.forEach(function(guess) {
        listCheck.insertAdjacentHTML('beforeend', `<li>${guess}</li>`); // Each guess gets added to the list
    });

    // This clears and resets the input field after each guess
    guessInput.value = '';

    // If the player wins
    if (userGuess === correctNumber) {
        displayMessage('🥳 Correct Number!');
        numberDisplay.textContent = correctNumber; //Display the correct number in the middle box
        document.body.classList.add('gold-background');
        winningSound.play();

        // This checks if the current score is larger the high score
        if (score > highscore) { // If the current score is higher than the saved high score
            highscore = score; // Update the high score
            highscoreDisplay.textContent = highscore; // Update the high score display
        }

        // This blocks/diables the input field if the user wins
        guessInput.disabled = true;
    } else {
        // If the player guesses wrong
        score--; // Decrease the score by 1
        displayMessage(userGuess > correctNumber ? '📈 Too high!' : '📉 Too low!'); // This gives feedback on the guess

        // // This calls the function to update the number of tries left
        updateScoreDisplay();

        // Check if score is 0 and end the game
        if (score <= 0) {
            displayMessage('😢 Game Over! Click "Again!" to restart.');
            losingSound.play();
            document.body.classList.add('red-background');
            guessInput.disabled = true; //This blocks/diables the input field if the user looses
        }
    }
});



// This function handles the "Again!" button click (reset everything)
againButton.addEventListener('click', function() {
    // This Reset all values
    score = 10; // This resets the score to 10 (tries left)
    correctNumber = Math.floor(Math.random() * 20) + 1;
    guessHistory = [];

    displayMessage('Start guessing...'); // This shows the player a message to start playing
    numberDisplay.textContent = '?'; // This hides the correct number by displaying '?'
    guessInput.value = '';
    updateScoreDisplay(); // Update the displayed number of tries left
    guessInput.disabled = false; // This enables the input field for a new game

    // This reset the guess history display
    listCheck.innerHTML = "";

    // Remove any background colors when resetting
    document.body.classList.remove('gold-background');
    document.body.classList.remove('red-background');
});
