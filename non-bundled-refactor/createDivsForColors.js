var createDivsForColors = function(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameBoxesDiv.append(newDiv);
    }
}