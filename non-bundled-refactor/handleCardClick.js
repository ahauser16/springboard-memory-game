var handleCardClick = function(event) {
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