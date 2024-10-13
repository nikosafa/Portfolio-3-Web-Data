'use strict';

//Jeg har lavet spillet en smule om, så en bruger har 10 forsøg til at gætte det rigtige tal.


// DOM elementer
const checkButton = document.querySelector('.btn.check'); // Knap til at tjekke gættet
const guessInput = document.querySelector('.guess'); // Input-felt for brugerens gæt
const messageDisplay = document.querySelector('.message'); // Område til at give beskeder til brugeren
const numberDisplay = document.querySelector('.number'); // Område til at vise det korrekte nummer
const againButton = document.querySelector('.btn.again'); // Knap til at genstarte spillet
const scoreDisplay = document.querySelector('.score'); // Viser antallet af tilbageværende forsøg
const highscoreDisplay = document.querySelector('.highscore'); // Viser den højeste score
const listCheck = document.getElementById('listCheck'); // Liste som viser spillerens historik af gæt



// Lydfiler til lydeffekter
//Links til noter: https://www.w3schools.com/jsref/met_audio_play.asp
const winningSound = document.getElementById('Winning');
const losingSound = document.getElementById('Loosing');
const mistakeSound = document.getElementById('Mistake');



// Spillets variabler
//Links til noter: https://www.w3schools.com/jsref/jsref_random.asp
let correctNumber = Math.floor(Math.random() * 20) + 1; // Laver et tilfældigt tal mellem 1 og 20
let score = 10; // Startscoren, som er antallet af tilbageværende forsøg
let highscore = 0; // Den første high score, når spillet ikke er blevet spillet før
let guessHistory = []; // Array som gemmer historikken af forsøg



// Funktion som viser en besked
const displayMessage = function(message) {
    messageDisplay.textContent = message;
};



// Opdater funktion for visning af resultatet, så den viser det aktuelle antal forsøg tilbage
const updateScoreDisplay = function() {
    scoreDisplay.textContent = score;
};



// Start spillet. Dette 'kalder' funktionen, så de første forsøg er 10.
// Links til noter: https://www.w3schools.com/js/js_function_call.asp
updateScoreDisplay();



// Dette aflæser spillerens gæt og konverterer det til et tal
//Links til noter: https://www.w3schools.com/jsref/met_element_addeventlistener.asp
checkButton.addEventListener('click', function() { //Funktionen kaldes
    const userGuess = Number(guessInput.value);

    // Tjekker for ugyldigt input
    if (!userGuess || userGuess < 1 || userGuess > 20) {
        mistakeSound.play();
        displayMessage('😡 Please enter a valid number between 1 and 20!');
        guessInput.value = ''; //Dette ryder inputfeltet
        return; // Afslutter funktionen, og retunere værdien til der hvor funktionen bliver kaldt.
    }

    // Denne 'skubber' spillerens input ind i arryaen der indehodler spillerens historik
    guessHistory.push(userGuess);

    // Dette rydder historiklisten og viser den opdaterede gættehistorik
    listCheck.innerHTML = "";

    //Dette går gennem guessHistory-arrayet, som itererer arrayet, og det føjer hvert gæt til listen
    //Links til noter: https://www.w3schools.com/js/js_array_iteration.asp
    guessHistory.forEach(function(guess) {
        listCheck.insertAdjacentHTML('beforeend', `<li>${guess}</li>`); // Hvert gæt bliver tilføjet til listen
    });

    // //Dette ryder inputfeltet og nulstiller inputfeltet efter hvert gæt
    guessInput.value = '';

    // Hvis spilleren vinder
    if (userGuess === correctNumber) {
        displayMessage('🥳 Correct Number!');
        numberDisplay.textContent = correctNumber; //Vis det korrekte tal i den midterste boks
        document.body.classList.add('gold-background');
        winningSound.play();

        // Dette kontrollerer, om den aktuelle score er højere end den tidligere høje score
        if (score > highscore) { // Hvis den nuværende score er højere end den gemte høje score
            highscore = score; // // Opdater den højeste score
            highscoreDisplay.textContent = highscore; //Opdater feltet hvor den føjeste score bliver vist
        }

        // Dette blokerer inputfeltet, hvis brugeren vinder, så der ikke kan tastes flere tal
        guessInput.disabled = true;
    } else {
        // Hvis spilleren gætter forkert
        score--; // Reducer scoren med 1
        displayMessage(userGuess > correctNumber ? '📈 Too high!' : '📉 Too low!'); // Dette giver spilleren feedback om deres gæt

        // Dette 'kalder' funktionen til at opdatere antallet af forsøg tilbage
        updateScoreDisplay();

        // Tjek om scoren er 0 og afslut spillet
        if (score <= 0) {
            displayMessage('😢 Game Over! Click "Again!" to restart.');
            losingSound.play();
            document.body.classList.add('red-background');
            guessInput.disabled = true;
        }
    }
});



// Denne funktion kontrollere "Again!" knap klik og nulstiller alt
againButton.addEventListener('click', function() {
    // Denne nulstiller alle værdier
    score = 10; // Dette nulstiller scoren tilbage til de 10 forsøg
    correctNumber = Math.floor(Math.random() * 20) + 1;
    guessHistory = [];

    displayMessage('Start guessing...'); // Dette viser spilleren en besked om at de kan begynde at gætte
    numberDisplay.textContent = '?'; // Dette skjuler det korrekte tal ved at vise '?'
    guessInput.value = '';
    updateScoreDisplay(); // Opdater det viste antal forsøg tilbage
    guessInput.disabled = false;

    // Dette nulstiller historik-feltet
    listCheck.innerHTML = "";

    // Fjern baggrundsfarver ved nulstilling
    document.body.classList.remove('gold-background');
    document.body.classList.remove('red-background');
});