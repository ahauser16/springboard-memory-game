import { startGame, createDivsForColors, shuffle } from './game-setup.js';
import { handleCardClick, isCardClickable, flipCard, handleTwoCardsFlipped, handleCardsMatch, markCardsAsMatched, incrementScore, flipCardsBackOver, allPairsMatched } from './game-logic.js';
import { endGame } from './game-end.js';
import { loadScores, createScoreItem } from './local-storage.js';
import { initializeScoreDisplay, updateScore } from './score.js';

// Initialize game state variables
const COLORS = ["red", "blue", "green", "orange", "purple"];
let username = '';
let doubleColors = COLORS.concat(COLORS);
let shuffledColors = shuffle(doubleColors);
let score = 0;
let numOfFlippedCards = 0;
let lastClickedCard = null;
let clickable = true;

document.addEventListener('DOMContentLoaded', (event) => {
    // Get DOM elements
    let startGameButton = document.getElementById('start-game');
    let gameBoxesDiv = document.getElementById('game-boxes');
    let scoreDisplay = document.getElementById('score');
    let restartGameButton = document.getElementById('restart-game');

    // Initialize the score display
    initializeScoreDisplay(scoreDisplay);

    // Attach event listeners
    startGameButton.addEventListener('click', () => {
        console.log('startGameButton clicked');
        username = prompt("Enter your username");
        console.log('Username:', username);
        score = startGame(username, shuffledColors, gameBoxesDiv, createDivsForColors, updateScore, handleCardClick, scoreDisplay);
    });

    restartGameButton.addEventListener('click', () => {
        console.log('restartGameButton clicked');
        endGame(username, score);
        score = 0;
        updateScore(score, scoreDisplay);
        score = startGame(username, shuffledColors, gameBoxesDiv, createDivsForColors, updateScore, handleCardClick, scoreDisplay);
    });

    // Load scores from local storage
    loadScores();
});