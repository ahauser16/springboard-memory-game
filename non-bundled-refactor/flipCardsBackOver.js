var flipCardsBackOver = function(card) {
    let firstClickedCard = lastClickedCard;
    setTimeout(() => {
        card.style.backgroundColor = '';
        firstClickedCard.style.backgroundColor = '';
        clickable = true;
    }, 1000);
}