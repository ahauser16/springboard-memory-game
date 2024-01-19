var handleCardsMatch = function(card) {
    markCardsAsMatched(card, lastClickedCard);
    incrementScore();
    updateScore();
    lastClickedCard = null;
    clickable = true;

    if (allPairsMatched()) {
        endGame(username, score);
    }
}