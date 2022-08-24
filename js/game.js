import { Character } from "./Character.js";
import { ProyectileBall } from "./ProyectileBall.js"
import { EnemyBall } from "./EnemyBall.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const character1 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, canvas, ctx);
// const character2 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, ctx);
const proyectile = new ProyectileBall(canvas.width / 2, canvas.height + character1.height / 2, 25, randomColor(), '', canvas, ctx, character1);

const level2 = [
  ['R','R','Y','Y','B','B','G','G'],
  ['R','R','Y','Y','B','B','G'],
  ['B','B','G','G','R','R','Y','Y'],
  ['B','G','G','R','R','Y','Y']
];
const level1 = [
  ['R','R','R','Y','B','B','G','G'],
  ['R','R','R','Y','B','B','G'],
  ['B','B','R','G','R','R','Y','Y'],
  ['B','G','R','R','R','Y','Y']
]
// const level1 = [['R']];
const balls = [];

function startGame() {
  detectKeysPressed(character1);
  const ballsGrid = createBallsGrid();
  transformLevelToBalls(level1, ballsGrid);
  // deleteBalls(ballsGrid[2][3], ballsGrid);
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character1.draw();
    character1.drawAimAssist();
    // Drawing level
    drawBalls(ballsGrid);
    proyectile.draw();
    if (character1.shooting === true) {
      proyectile.move();
      detectCollision(ballsGrid, proyectile);
      if (proyectile.collision === true) {
        character1.shooting = false;
        proyectile.collision = false;
        paintBall(ballsGrid, proyectile);
        proyectile.color = randomColor();
      }
    } else { 
      proyectile.updateSpeed();
      proyectile.x = proyectile.x = canvas.width / 2;
      proyectile.y = canvas.height + character1.height / 2;
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
        character.shooting = true;
        proyectile.moving = true; 
        break;
      case 'ArrowUp':
        character.shooting = false;
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
      if (
        getCentersDistance(proyectile, ball) <= proyectile.radius + ball.radius && 
        ball.color 
        ) {
        proyectile.moving = false;
        proyectile.collision = true;
      } else if (proyectile.y <= 0) {
        proyectile.moving = false;
        proyectile.collision = true;
      }
    });
  }); 
}

function getNearestBall(ballsGrid, proyectile) {
  let nearestDistance = 600;
  let nearestBallIndex;
  ballsGrid.forEach((row, rindex) => {
    row.forEach((ball, bindex) => {
      if(getCentersDistance(proyectile, ball) <= nearestDistance) {
        nearestDistance = getCentersDistance(proyectile, ball);
        nearestBallIndex = [rindex, bindex];
      }
    });
  });
  return nearestBallIndex;
}

function paintBall(ballsGrid, proyectile) {
  const index = getNearestBall(ballsGrid, proyectile);
  const paintedBall = ballsGrid[index[0]][index[1]];
  paintedBall.color = proyectile.color;
  paintedBall.showBall();
  deleteBalls(paintedBall, ballsGrid)
  return paintedBall;
}

function randomColor() {
  const colors = ['red', 'yellow', 'green', 'blue'];
  const randColor = colors[Math.floor(Math.random()*colors.length)];
  return randColor;
}

function getCentersDistance(ball1, ball2) {
  const distanceX = ball1.x - ball2.x;
  const distanceY = ball1.y - ball2.y;
  return Math.sqrt(distanceX**2 + distanceY**2)
}

function deleteBalls(comparingBall, ballsGrid) {
  let sameBalls = getAroundBallsColor(comparingBall, ballsGrid);
  let allColors = [];
  let uniqueBalls = [];
  // Iterates for get more same color balls
  // 2, 3
  for (let i = 0; i < ballsGrid.length; i++) {
    sameBalls.forEach((balls) => {
      const sameColor = getAroundBallsColor(balls, ballsGrid);
      allColors = allColors.concat(sameColor);
      sameBalls = sameBalls.concat(allColors)
    });
    uniqueBalls = sameBalls.filter((ball, index) => {
      return sameBalls.indexOf(ball) === index;
    })
    sameBalls = uniqueBalls;
  }
  console.log(sameBalls)
  // Gets array of unique balls
  console.log('unique',uniqueBalls)
  if (uniqueBalls.length >= 3) {
    uniqueBalls.forEach((ball) => {
      ball.display = false;
      ball.color = ''
    });
  }
}

function getAroundBallsColor(comparingBall, ballsGrid) {
  // get index of the ball to compare
  let index;
  let ballsNear = [];
  ballsGrid.forEach((row, rindex) => {
    row.forEach((ball, bindex) => {
      if(comparingBall.x === ball.x && comparingBall.y === ball.y) {
        index = [rindex, bindex];
      }
    });
  });
  // Compare all 6 balls around
  ballsGrid.forEach((row, rindex) => {
    row.forEach((ball, bindex) => {
      if(
        (ball.x === comparingBall.x - comparingBall.radius && ball.y === comparingBall.y - 2 * comparingBall.radius) ||
        (ball.x === comparingBall.x + comparingBall.radius && ball.y === comparingBall.y - 2 * comparingBall.radius) ||
        (ball.x === comparingBall.x - 2 * comparingBall.radius && ball.y === comparingBall.y) ||
        (ball.x === comparingBall.x + 2 * comparingBall.radius && ball.y === comparingBall.y) ||
        (ball.x === comparingBall.x - comparingBall.radius && ball.y === comparingBall.y + 2 * comparingBall.radius) ||
        (ball.x === comparingBall.x + comparingBall.radius && ball.y === comparingBall.y + 2 * comparingBall.radius)
        ) {
        if (ball.color === comparingBall.color) {
          ballsNear.push(ball)
        }
      }
    });
  });
  return ballsNear;
}

startGame();
