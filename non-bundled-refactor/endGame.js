var endGame = function(username, score) {
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];

    scores.push({ username: username, score: score });

    localStorage.setItem('user-scores', JSON.stringify(scores));

    loadScores();

    setTimeout(function () {
        alert('CONGRATULATIONS! GAME OVER!');
    }, 100);
}