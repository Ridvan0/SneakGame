import SnakeGame from "./game.js";

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  const game = new SnakeGame();
  game.showLastScores();
  
  startButton.addEventListener('click', function () {
    game.start();
  });
  
  const mapSize = [300, 300];
  document.documentElement.style.setProperty('--width', `${mapSize[0]}px`);
  document.documentElement.style.setProperty('--height', `${mapSize[1]}px`);

  document.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowUp':
        game.changeDirection('UP');
        break;
      case 'ArrowDown':
        game.changeDirection('DOWN');
        break;
      case 'ArrowLeft':
        game.changeDirection('LEFT');
        break;
      case 'ArrowRight':
        game.changeDirection('RIGHT');
        break;
    }
  });
}); 