var handleTwoCardsFlipped = function(card, colorClass) {
    clickable = false;

    if (lastClickedCard.className === colorClass) {
        handleCardsMatch(card);
    } else {
        flipCardsBackOver(card);
    }

    numOfFlippedCards = 0;
}