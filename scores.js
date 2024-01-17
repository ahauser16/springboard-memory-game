export function initializeScoreDisplay(scoreDisplay) {
    // Initialize the score display
    scoreDisplay.textContent = 'Score: 0';
}

export function incrementScore(score, scoreDisplay) {
    // Increment the score
    score++;

    // Update the score display
    scoreDisplay.textContent = `Score: ${score}`;

    return score;
}

export function updateScore(score, scoreDisplay) {
    // Update the score display
    scoreDisplay.textContent = `Score: ${score}`;
  }