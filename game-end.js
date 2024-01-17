import { loadScores } from './local-storage.js';

export function endGame(username, score) {
  // Get the existing scores from localStorage
  let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

  // Add the new score
  scores.push({ username: username, score: score });

  // Save the scores back to localStorage
  localStorage.setItem('user-scores', JSON.stringify(scores));

  // Load the updated scores
  loadScores();
}