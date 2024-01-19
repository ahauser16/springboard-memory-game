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

  function generateRandomColor() {
    const h = Math.floor(Math.random() * 361);
    const s = 100;
    const l = 50;
    return `hsl(${h},${s}%,${l}%)`;
  }

  function loadScores() {
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

    scores.sort(function (a, b) {
      return b.score - a.score;
    });

    for (let i = 0; i < scores.length; i++) {
      createScoreItem(scores[i].username, scores[i].score);
    }
  }

  function createScoreItem(username, score) {
    console.log('createScoreItem', username, score);

    const li = document.createElement('li');
    li.className = 'score-item';

    const p = document.createElement('p');
    p.className = 'score';
    p.textContent = `${username}: ${score}`;

    li.appendChild(p);

    let ol = document.querySelector('#high-scores #score-list');

    if (!ol) {
      ol = document.createElement('ol');
      ol.id = 'score-list';
      document.getElementById('high-scores').appendChild(ol);
    }

    ol.appendChild(li);
  }

  function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
  }

  function startGame() {
    username = prompt('Please enter your username');
    localStorage.setItem('username', username);

    let numOfPairs = prompt('Please enter the number of pairs of cards');
    COLORS.length = 0; // Clear the COLORS array
    for (let i = 0; i < numOfPairs; i++) {
      let color = generateRandomColor();
      COLORS.push(color, color); // Add the same color twice to the array
    }

    shuffledColors = shuffle(COLORS);

    gameBoxesDiv.innerHTML = '';
    createDivsForColors(shuffledColors);
    score = 0;
    updateScore();
  }

  function endGame(username, score) {
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

    scores.push({ username: username, score: score });

    localStorage.setItem('user-scores', JSON.stringify(scores));

    loadScores();

    setTimeout(function () {
      alert('CONGRATULATIONS! GAME OVER!');
    }, 100);
  }

  function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {

      const newDiv = document.createElement("div");

      newDiv.classList.add(color);

      newDiv.addEventListener("click", handleCardClick);

      gameBoxesDiv.append(newDiv);
    }
  }

  function handleCardClick(event) {
    if (!isCardClickable(event.target)) return;

    let colorClass = event.target.className;
    flipCard(event.target, colorClass);

    if (numOfFlippedCards >= 2) return;

    numOfFlippedCards++;

    if (numOfFlippedCards === 2) {
      handleTwoCardsFlipped(event.target, colorClass);
    }

    lastClickedCard = event.target;
  }

  function isCardClickable(card) {
    return clickable && card !== lastClickedCard;
  }

  function flipCard(card, colorClass) {
    card.style.backgroundColor = colorClass;
  }

  function handleTwoCardsFlipped(card, colorClass) {
    clickable = false;

    if (lastClickedCard.className === colorClass) {
      handleCardsMatch(card);
    } else {
      flipCardsBackOver(card);
    }

    numOfFlippedCards = 0;
  }

  function handleCardsMatch(card) {
    markCardsAsMatched(card, lastClickedCard);
    incrementScore();
    updateScore();
    lastClickedCard = null; 
    clickable = true; 

    if (allPairsMatched()) {
      endGame(username, score);
    }
  }

  function markCardsAsMatched(card1, card2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
  }

  function incrementScore() {
    score++;
  }

  function flipCardsBackOver(card) {
    let firstClickedCard = lastClickedCard;
    setTimeout(() => {
      card.style.backgroundColor = '';
      firstClickedCard.style.backgroundColor = '';
      clickable = true;
    }, 1000);
  }

  function allPairsMatched() {
    let cards = document.querySelectorAll('#game-boxes div');

    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].classList.contains('matched')) {
        return false;
      }
    }

    return true;
  }

  startGameButton.addEventListener('click', startGame);
  restartGameButton.addEventListener('click', startGame);

});

