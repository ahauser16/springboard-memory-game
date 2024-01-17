// initializing variables for GL2
let flippedCards = 0;
let lastClickedCard = null;
let clickable = true; // add this line

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  // if cards are not clickable, return early
  if (!clickable) return; // add this line

  // check if the current clicked card is the same as the last clicked card
  if (event.target === lastClickedCard) {
    // if it is, return early to prevent it from counting as a match
    return;
  }

  // get the class of the clicked element
  let colorClass = event.target.classList[0];

  // set the background color of the clicked element to its class
  event.target.style.backgroundColor = colorClass;

  // increment the flippedCards counter
  flippedCards++;

  // check if this is the second card that was flipped
  if (flippedCards === 2) {
    // make cards not clickable
    clickable = false; // add this line

    // compare the classes of the last clicked card and the current card
    if (lastClickedCard.classList[0] === colorClass) {
      // if they match, add a 'matched' class to both cards
      event.target.classList.add('matched');
      lastClickedCard.classList.add('matched');
      // make cards clickable again
      clickable = true; // add this line
    } else {
      // if they don't match, reset their background colors after a delay
      let firstClickedCard = lastClickedCard;
      setTimeout(() => {
        event.target.style.backgroundColor = '';
        firstClickedCard.style.backgroundColor = '';
        // make cards clickable again
        clickable = true; // add this line
      }, 1000);
    }

    // reset the flippedCards counter
    flippedCards = 0;
  }

  // store the last clicked card
  lastClickedCard = event.target;
}