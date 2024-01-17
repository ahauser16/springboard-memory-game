export function handleCardClick(event, lastClickedCard, numOfFlippedCards, clickable, handleTwoCardsFlipped, flipCard, isCardClickable) {
    if (!isCardClickable(event.target, lastClickedCard, clickable)) return;

    let colorClass = event.target.className;
    flipCard(event.target, colorClass);

    if (numOfFlippedCards >= 2) return;

    numOfFlippedCards++;

    if (numOfFlippedCards === 2) {
        [lastClickedCard, numOfFlippedCards, clickable] = handleTwoCardsFlipped(event.target, colorClass, lastClickedCard, numOfFlippedCards, clickable, handleCardsMatch, flipCardsBackOver);
    } else {
        lastClickedCard = event.target;
    }

    return [lastClickedCard, numOfFlippedCards, clickable];
}

export function isCardClickable(card, lastClickedCard, clickable) {
    return clickable && card !== lastClickedCard;
}

export function flipCard(card, colorClass) {
    card.style.backgroundColor = colorClass;
}

export function handleTwoCardsFlipped(card, colorClass, lastClickedCard, numOfFlippedCards, clickable, handleCardsMatch, flipCardsBackOver) {
    clickable = false;

    if (lastClickedCard.className === colorClass) {
        [lastClickedCard, clickable] = handleCardsMatch(card, lastClickedCard, clickable, incrementScore, allPairsMatched);
    } else {
        flipCardsBackOver(card, lastClickedCard, clickable, (newLastClickedCard, newClickable) => {
            lastClickedCard = newLastClickedCard;
            clickable = newClickable;
        });
    }

    numOfFlippedCards = 0;

    return [lastClickedCard, numOfFlippedCards, clickable];
}

export function handleCardsMatch(card, lastClickedCard, clickable, incrementScore, allPairsMatched) {
    markCardsAsMatched(card, lastClickedCard);
    incrementScore();
    lastClickedCard = null; // Reset lastClickedCard
    clickable = true; // Set clickable back to true

    // Check if all pairs have been matched
    if (allPairsMatched()) {
        endGame(username, score);
    }

    return [lastClickedCard, clickable];
}

export function markCardsAsMatched(card1, card2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
}

export function incrementScore(score) {
    return score + 1;
}

export function flipCardsBackOver(card, lastClickedCard, clickable, callback) {
    setTimeout(() => {
        card.style.backgroundColor = '';
        lastClickedCard.style.backgroundColor = '';
        lastClickedCard = null; // Reset lastClickedCard
        clickable = true; // Set clickable back to true

        // Call the callback function with the new values of lastClickedCard and clickable
        callback(lastClickedCard, clickable);
    }, 1000);
}

export function allPairsMatched(gameBoxesDiv) {
    // Get all cards
    let cards = gameBoxesDiv.querySelectorAll('div');

    // Check if all cards have the 'matched' class
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains('matched')) {
            return false;
        }
    }

    return true;
}