document.addEventListener('DOMContentLoaded', (event) => {

  const COLORS = ["red", "blue", "green", "orange", "purple"];

  // Initialize username at the top of your script
  let username = '';

  // utility function that duplicate the colors array to have two of each color in the game
  let doubleColors = COLORS.concat(COLORS);

  // shuffle the colors array
  let shuffledColors = shuffle(doubleColors);

  // FS1stepTwo--> select the start game button
  let startGameButton = document.getElementById('start-game');

  //FS3stepTwo-->select the game boxes div  
  let gameBoxesDiv = document.getElementById('game-boxes');

  // FS3stepOne-->select the score display
  let scoreDisplay = document.getElementById('score');

  // FS3stepTwo-->initialize the score
  let score = 0;

  // FS2stepTwo-->select the restart game button
  let restartGameButton = document.getElementById('restart-game');

  //initializing variables for GL2
  let numOfFlippedCards = 0;
  let lastClickedCard = null;

  // GL6stepOne-->add this line below
  let clickable = true;

  // Load scores from localStorage
  loadScores();

  function loadScores() {
    // Get the scores from localStorage
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

    // For each score
    for (let i = 0; i < scores.length; i++) {
      // Display the username and score
      createScoreItem(scores[i].username, scores[i].score);
    }
  }

  // Step 1: Create a function to create a new score item
  function createScoreItem(username, score) {
    console.log('createScoreItem', username, score);

    // Step 2: Create a new <li class="score-item"> element
    const li = document.createElement('li');
    li.className = 'score-item';

    // Step 3: Inside this <li> element, create a new <p class="score"> element and set its text content to the score
    const p = document.createElement('p');
    p.className = 'score';
    p.textContent = `${username}: ${score}`;

    // Step 4: Append the <p> element to the <li> element
    li.appendChild(p);

    // Step 5: Get the <ol class="score-list"> element from the DOM
    let ol = document.querySelector('#high-scores #score-list');

    // If the <ol class="score-list"> doesn't exist, create it
    if (!ol) {
      ol = document.createElement('ol');
      ol.id = 'score-list';
      document.getElementById('high-scores').appendChild(ol);
    }

    // Step 6: Append the <li> element to the <ol> element
    ol.appendChild(li);
  }

  // FS3stepThree-->update the score display
  function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
  }

  //consolidates goals 1 and 2 of Further Study
  function startGame() {
    username = prompt('Please enter your username');
    localStorage.setItem('username', username);

    gameBoxesDiv.innerHTML = '';
    createDivsForColors(shuffledColors);
    score = 0;
    updateScore();
  }

  function endGame(username, score) {
    // Get the existing scores from localStorage
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

    // Add the new score
    scores.push({ username: username, score: score });

    // Save the scores back to localStorage
    localStorage.setItem('user-scores', JSON.stringify(scores));

    // Load the updated scores
    loadScores();
  }

  // here is a helper function to shuffle an array.  it returns the same array with values shuffled.  it is based on an algorithm called Fisher Yates if you want ot research more.  It is a common interview question!
  function shuffle(array) {
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

  // this function loops over the array of colors. it creates a new div and gives it a class with the value of the color.  it also adds an event listener for a click for each card.
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {

      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameBoxesDiv.append(newDiv);
    }
  }

  // TODO: Implement this function!
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
    lastClickedCard = null; // Reset lastClickedCard
    clickable = true; // Set clickable back to true

    // Check if all pairs have been matched
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
    // Get all cards
    let cards = document.querySelectorAll('#game-boxes div');
  
    // Check if all cards have the 'matched' class
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].classList.contains('matched')) {
        return false;
      }
    }
  
    return true;
  }

  // reset the score when the game is started or restarted
  startGameButton.addEventListener('click', startGame);
  restartGameButton.addEventListener('click', startGame);

});

