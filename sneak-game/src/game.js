import Snake from "./snake.js";
import GameBoard from "./gameBoard.js";
import Food from "./food.js";

class SnakeGame {
  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.gameBoard = new GameBoard();
    this.snake = new Snake(60, 60);
    this.food = Food.createFoodPosition()
    console.log('this.food',this.food);

    this.direction = 'RIGHT';
    this.isMoving = false;
    this.isGameOver = false;
    this.speed = 1;
    this.updateInterval = 10; //(1 saniyede 10 güncelleme)
    this.foodCount = 0;
    this.score = 0;
    this.lastScores = this.loadLastScores();
   
    this.gameLoop();
  }

  
  
  loadLastScores() {
    const storedScores = JSON.parse(localStorage.getItem('lastScores'));
    return Array.isArray(storedScores) ? storedScores : [];
  }

  gameLoop() {
    setInterval(() => {
      if (this.isMoving && !this.isGameOver) {
        this.updateGame();
      }
    }, this.updateInterval);
  }

  updateGame() {
    this.snake.move(this.direction, this.speed);
    this.checkCollision();
    this.checkFoodEating();
    this.gameBoard.draw(this.snake.parts, this.food);

  }

  checkCollision() {
    if (this.snake.checkCollision()) {
      this.gameOver();
    }
  }

  checkFoodEating() {
    const distance = Math.hypot(
      this.snake.parts[0].x - this.food.x,
      this.snake.parts[0].y - this.food.y
    );

    if (distance <= 13) {
      this.handleFoodEating();
    } else {
      this.snake.popTail();
    }
  }


  handleFoodEating() {
    this.food = Food.createFoodPosition()
    this.foodCount++;

    if (this.foodCount % 5 === 0) {
      this.speed++;
      console.log('Speed increased! New speed:', this.speed);
    }

    this.score += 10;

    const currentScore = document.getElementsByClassName('score')[0];
    currentScore.innerText = `puan :${this.score}`;

    console.log('Score:', this.score);
  }

  gameOver() {
    this.isGameOver = true;
    alert('Game Over! Your score: ' + this.score);
    this.lastScores.push(this.score);

    if (this.lastScores.length > 5) {
      this.lastScores.shift();
    }

    localStorage.setItem('lastScores', JSON.stringify(this.lastScores));
    this.showLastScores();
  }

  resetGame() {
    this.isGameOver = false;
    this.snake = new Snake(60, 60);
    this.direction = 'RIGHT';
    this.speed = 1;
    this.foodCount = 0;
    this.score = 0;
    this.food = Food.createFoodPosition()
    console.log('this.food',this.food);

  }

  showLastScores() {
    const lastScoresElement = document.getElementById('last-scores');
    lastScoresElement.innerHTML = '';
    this.lastScores.forEach((score, index) => {
      const scoreElement = document.createElement('div');
      scoreElement.innerText = `Score ${index + 1}: ${score}`;
      lastScoresElement.appendChild(scoreElement);
    });
  }

  start() {
    this.resetGame();
    this.isMoving = true;
  }

  changeDirection(newDirection) {
    if (
      (newDirection === 'UP' && this.direction !== 'DOWN') ||
      (newDirection === 'DOWN' && this.direction !== 'UP') ||
      (newDirection === 'LEFT' && this.direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && this.direction !== 'LEFT')
    ) {
      this.direction = newDirection;
    }
  }
}

export default SnakeGame;