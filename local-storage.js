export function loadScores() {
    // Get the scores from localStorage
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

    // For each score
    for (let i = 0; i < scores.length; i++) {
        // Display the username and score
        createScoreItem(scores[i].username, scores[i].score);
    }
}

export function createScoreItem(username, score) {
    console.log('createScoreItem', username, score);

    // Create a new <li class="score-item"> element
    const li = document.createElement('li');
    li.className = 'score-item';

    // Inside this <li> element, create a new <p class="score"> element and set its text content to the score
    const p = document.createElement('p');
    p.className = 'score';
    p.textContent = `${username}: ${score}`;

    // Append the <p> element to the <li> element
    li.appendChild(p);

    // Get the <ol class="score-list"> element from the DOM
    let ol = document.querySelector('#high-scores #score-list');

    // If the <ol class="score-list"> doesn't exist, create it
    if (!ol) {
        ol = document.createElement('ol');
        ol.id = 'score-list';
        document.getElementById('high-scores').appendChild(ol);
    }

    // Append the <li> element to the <ol> element
    ol.appendChild(li);
}