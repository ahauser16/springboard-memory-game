document.addEventListener('DOMContentLoaded', (event) => {

    const COLORS = ["red", "blue", "green", "orange", "purple"];
    let username = '';
    let doubleColors = COLORS.concat(COLORS);
    let shuffledColors = shuffle(doubleColors);
    let startGameButton = document.getElementById('start-game');
    let gameBoxesDiv = document.getElementById('game-boxes');
    let scoreDisplay = document.getElementById('score');
    let score = 0;
    let restartGameButton = document.getElementById('restart-game');
    let numOfFlippedCards = 0;
    let lastClickedCard = null;
    let clickable = true;

    loadScores();

    startGameButton.addEventListener('click', startGame);
    restartGameButton.addEventListener('click', startGame);

});

