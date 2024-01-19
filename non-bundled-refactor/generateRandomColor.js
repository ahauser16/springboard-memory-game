var generateRandomColor = function() {
    const h = Math.floor(Math.random() * 361);
    const s = 100;
    const l = 50;
    return `hsl(${h},${s}%,${l}%)`;
  }