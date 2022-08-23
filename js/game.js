import { Character } from "./Character.js";
import { ProyectileBall } from "./ProyectileBall.js"
import { EnemyBall } from "./EnemyBall.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const character1 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, canvas, ctx);
// const character2 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, ctx);
const proyectile = new ProyectileBall(canvas.width / 2, canvas.height + character1.height / 2, 25, 'red', '', canvas, ctx, character1);

const level1 = [
  ['R','R','Y','Y','B','B','G','G'],
  ['R','R','Y','Y','B','B','G'],
  ['B','B','G','G','R','R','Y','Y'],
  ['B','G','G','R','R','Y','Y']
];
const balls = [];

function startGame() {
  detectKeysPressed(character1);
  const ballsGrid = createBallsGrid();
  transformLevelToBalls(level1, ballsGrid);
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character1.draw();
    character1.drawAimAssist();
    // Drawing level
    drawBalls(ballsGrid);
    proyectile.draw();
    if(character1.shooting === true) {
      if(proyectile.y > proyectile.radius) {
        proyectile.move();
        detectCollision(ballsGrid, proyectile); 
      }
    } else {
      proyectile.updateSpeed();
    }
  }, 1000 / 60);
}

function detectKeysPressed(character) {
  document.addEventListener('keydown', (event) => {
    // console.log(event.code);
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        character.aimLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        character.aimRight();
        break;
      case 'Space':
        event.preventDefault();
        character.shoot();
        proyectile.moving = true;
        break;
    }
  });
}

function createBallsGrid() {
  const ballsGrid = []
  const ballsRadio = 25;
  const maxHeight = 100
  const rows = (canvas.height - maxHeight) / (ballsRadio * 2);
  let columns;
  for (let i = 0; i < rows; i++) {
    ballsGrid.push([]);
    if (i % 2 === 0) {
      columns = canvas.width / (ballsRadio * 2);
    } else {
      columns = canvas.width / (ballsRadio * 2) - 1;
    }
    for (let j = 0; j < columns; j++) {
      if (i % 2) {
        ballsGrid[i].push(new EnemyBall((j + 1) * 2 * ballsRadio, (i * 2 + 1) * ballsRadio, ballsRadio, '', '', canvas, ctx))
      } else {
        ballsGrid[i].push(new EnemyBall((j * 2 + 1) * ballsRadio, (i * 2 + 1) * ballsRadio, ballsRadio, '', '', canvas, ctx));
      }
    }
  }
  return ballsGrid;
}

function transformLevelToBalls(level, ballsGrid) {
  level.forEach((row, index) => {
    row.forEach((ball, cindex) => {
      switch (ball) {
        case 'R':
          ballsGrid[index][cindex].color = 'red';
          break;
        case 'Y':
          ballsGrid[index][cindex].color = 'yellow';
          break;
        case 'B':
          ballsGrid[index][cindex].color = 'blue';
          break;
        case 'G':
          ballsGrid[index][cindex].color = 'green';
          break;
      }
    });
  });
}

function drawBalls(ballsGrid) {
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if(ball.color) {
        ball.showBall();
      }
      ball.draw();
    });
  });
}

function detectCollision(ballsGrid, proyectile) {
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      if (getCentersDistance(proyectile, ball) <= proyectile.radius + ball.radius && ball.color) {
        proyectile.moving = false;
      }
    });
  }); 
}

function getCentersDistance(ball1, ball2) {
  const distanceX = ball1.x - ball2.x;
  const distanceY = ball1.y - ball2.y;
  return Math.sqrt(distanceX**2 + distanceY**2)
}
startGame();
