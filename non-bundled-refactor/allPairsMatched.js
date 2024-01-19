var allPairsMatched = function() {
    let cards = document.querySelectorAll('#game-boxes div');

    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains('matched')) {
            return false;
        }
    }

    return true;
}