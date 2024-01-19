var startGame = function() {
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