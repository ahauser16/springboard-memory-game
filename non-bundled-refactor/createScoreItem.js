var createScoreItem = function(username, score) {
    console.log('createScoreItem', username, score);
  
    const li = document.createElement('li');
    li.className = 'score-item';
  
    const p = document.createElement('p');
    p.className = 'score';
    p.textContent = `${username}: ${score}`;
  
    li.appendChild(p);
  
    let ol = document.querySelector('#high-scores #score-list');
  
    if (!ol) {
      ol = document.createElement('ol');
      ol.id = 'score-list';
      document.getElementById('high-scores').appendChild(ol);
    }
  
    ol.appendChild(li);
  }