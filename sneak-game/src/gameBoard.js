class GameBoard {
  constructor() {
    this.element = document.getElementById('game-board');
  }

  drawElement(element, className) {
    const el = document.createElement('div');
    el.style.left = element.x + 'px';
    el.style.top = element.y + 'px';
    el.classList.add(className);
    this.element.appendChild(el);
  }

  draw(snakeParts, foodPosition) {
    this.element.innerText = '';
    snakeParts.forEach(part => this.drawElement(part, 'snake'));
    this.drawElement(foodPosition, 'food');
  }
}

export default GameBoard; 