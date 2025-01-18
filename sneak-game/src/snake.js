class Snake {
  constructor(x, y) {
    this.parts = [{ x, y }];
  }

  move(direction, speed) {
    const head = Object.assign({}, this.parts[0]);

    switch (direction) {
      case 'UP':
        head.y -= speed;
        break;
      case 'DOWN':
        head.y += speed;
        break;
      case 'LEFT':
        head.x -= speed;
        break;
      case 'RIGHT':
        head.x += speed;
        break;
    }
    this.parts.unshift(head);
  }

  checkCollision() {
    const head = this.parts[0];
    return (
      head.x < 0 || head.y < 0 || head.x >= 280 || head.y >= 280 ||
      this.parts.slice(2).some(part => part.x === head.x && part.y === head.y)
    );
  }

  popTail() {
    this.parts.pop();
  }
}

export default Snake; 