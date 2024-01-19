var loadScores = function() {
    let scores = JSON.parse(localStorage.getItem('user-scores')) || [];
  
    scores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    for (let i = 0; i < scores.length; i++) {
      createScoreItem(scores[i].username, scores[i].score);
    }
  }