import { handleCardClick } from './game-logic.js';;

export function startGame(username, shuffledColors, gameBoxesDiv, createDivsForColors, updateScore, handleCardClick, lastClickedCard, numOfFlippedCards, clickable, handleTwoCardsFlipped, flipCard, isCardClickable) {
    console.log('startGame function called');
    let score = 0;

    username = prompt('Please enter your username');
    localStorage.setItem('username', username);

    gameBoxesDiv.innerHTML = '';
    createDivsForColors(shuffledColors, gameBoxesDiv, handleCardClick);
    // score = 0;
    updateScore(score, scoreDisplay);
    return score;
}

export function createDivsForColors(colorArray, gameBoxesDiv, handleCardClick, lastClickedCard, numOfFlippedCards, clickable, handleTwoCardsFlipped, flipCard, isCardClickable) {
    console.log('createDivsForColors function called');

    for (let color of colorArray) {
        // create a new div
        let newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener('click', (event) => handleCardClick(event, lastClickedCard, numOfFlippedCards, clickable, handleTwoCardsFlipped, flipCard, isCardClickable));

        // append the div to the element with an id of game
        gameBoxesDiv.append(newDiv);
    }
}

export function shuffle(array) {
    console.log('shuffle function called');

    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}