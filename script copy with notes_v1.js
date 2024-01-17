document.addEventListener('DOMContentLoaded', (event) => {

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  // duplicate the colors array to have two of each color in the game
let doubleColors = COLORS.concat(COLORS);

// shuffle the colors array
let shuffledColors = shuffle(doubleColors);

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

  // FS1stepTwo--> select the start game button
  let startGameButton = document.getElementById('start-game');

  // FS1stepThree--> select the game div
  let gameDiv = document.getElementById('game');

  //FS3stepTwo-->select the game boxes div  
  let gameBoxesDiv = document.getElementById('game-boxes');

  // FS1stepFour--> add a click event listener to the start game button
  startGameButton.addEventListener('click', function () {
    // FS1stepFive-->clear existing boxes
    gameBoxesDiv.innerHTML = '';

    // FS1stepSix--> start the game when the button is clicked
    createDivsForColors(shuffledColors);
  });

  // FS2stepTwo-->select the restart game button
  let restartGameButton = document.getElementById('restart-game');

  // FS2stepThree-->add a click event listener to the restart game button
  restartGameButton.addEventListener('click', function () {
    // FS2stepFour-->clear existing boxes
    gameBoxesDiv.innerHTML = '';

    // FS2stepFive-->restart the game when the button is clicked
    createDivsForColors(shuffledColors);
  });

  // FS3stepThree-->add a click event listener to the start game button
  //startGameButton.addEventListener('click', function () {
    // FS3stepFour-->clear existing boxes
    //gameBoxesDiv.innerHTML = '';

    // FS3stepFive-->start the game when the button is clicked
    //createDivsForColors(shuffledColors);
  //});

  // FS3stepSix-->add a click event listener to the restart game button
  //restartGameButton.addEventListener('click', function () {
    // FS3stepSeven-->clear existing boxes
    //gameBoxesDiv.innerHTML = '';

    // FS3stepEight-->restart the game when the button is clicked
    //createDivsForColors(shuffledColors);
  //});
  //




  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
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

  //initializing variables for GL2
  let flippedCards = 0;
  let lastClickedCard = null;
  //GL6-->How do I make sure that a user can not click too quickly and guess more than two cards at a time?  You can implement this by disabling all card clicks when two cards are flipped and then re-enabling them after a delay. This can be done by adding a `clickable` variable that is checked before processing a card click (see below).
  //GL6stepOne-->add this line below
  let clickable = true;

  // TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);

    //GL6stepTwo-->add this line below
    if (!clickable) return;

    //GL5--> How do I make sure that the "match" functionality only works with two different cards as opposed to clicking on the same card twice which shouldn't count as a match?  You can add a condition to check if the current clicked card is the same as the last clicked card. If it is, you can return early from the function to prevent it from counting as a match.
    if (event.target === lastClickedCard) {
      // if it is, return early to prevent it from counting as a match
      return;
    }

    //GL1-->goal number one is to make sure that Clicking a card should change the background color to be the color of the class it has.  You can achieve this by setting the `backgroundColor` of the clicked element (`event.target`) to its class name.
    // GL1stepOne-->get the class of the clicked element
    let colorClass = event.target.classList[0];

    // GL1stepTwo-->set the background color of the clicked element to its class
    event.target.style.backgroundColor = colorClass;

    // GL2-->logic that limits users to change at most two cards at a time?
    // GL2stepOne-->if two cards are already flipped, return
    if (flippedCards >= 2) {
      return;
    }

    // GL2-->goal number two is to make sure that users should only be able to change at most two cards at a time.  You can implement this by introducing a counter that keeps track of how many cards have been clicked. When two cards have been clicked, you can temporarily disable the click event listener.

    // GL3-->what logic can I implement so that when users click on two matching cards a "match” event occurs causing those cards to remain facing upward?  You can implement this by adding a new class to the matched cards. This class can be used to indicate that the cards are matched and should remain facing upward.

    // GL2stepTwo-->increment the flippedCards counter
    flippedCards++;

    // GL2stepThree-->check if this is the second card that was flipped
    if (flippedCards === 2) {
      // GL6stepThree-->add this line below to make cards not clickable
      clickable = false;

      // compare the classes of the last clicked card and the current card
      if (lastClickedCard.classList[0] === colorClass) {
        // GL3stepOne-->if they match, add a 'matched' class to both cards
        event.target.classList.add('matched');
        lastClickedCard.classList.add('matched');
        // GL6stepFour-->add this line below to make cards clickable again
        clickable = true;
      } else {
        // GL3stepOneB-->Due to the asynchronous nature of the `setTimeout` function when the `backgroundColor`of the `lastClickedCard` is set inside the `setTimeout` function, it might not have the expected value because it's updated immediately afterward in the `lastClickedCard = event.target;` line.  This might cause the first card to remain "face up" while the second card is set to "face down" after a failed match occurs between the two.  To fix this, you can create a temporary variable to store the `lastClickedCard` before the `setTimeout` function.
        let firstClickedCard = lastClickedCard;

        // GL3stepTwo-->if they don't match, reset their background colors after a delay.  GL4-->This `setTimeout` function also satisfies goal four which is when the user clicks two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a [???] so that you can execute code after one second.
        setTimeout(() => {
          event.target.style.backgroundColor = '';
          firstClickedCard.style.backgroundColor = '';
          // GL6stepFive-->add this line below to make cards clickable again
          clickable = true;
        }, 1000);
      }

      // GL3stepThree-->reset the flippedCards counter
      flippedCards = 0;
    }

    //GL2stepFour--> store the last clicked card
    lastClickedCard = event.target;
  }

  // when the DOM loads.  This is commented out because it conflicts with the start button.
  // createDivsForColors(shuffledColors);

});