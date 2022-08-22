import { Character } from "./Character.js";
import { ProyectileBall } from "./ProyectileBall.js"
import { EnemyBall } from "./EnemyBall.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const character1 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, canvas, ctx);
// const character2 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, ctx);
const proyectile = new ProyectileBall(canvas.width / 2, canvas.height + character1.height / 2, 50, 50, 'red', '', canvas, ctx, character1);

const level1 = [
  ['R','R','Y','Y','B','B','G','G'],
  ['R','R','Y','Y','B','B','G'],
  ['B','B','G','G','R','R','Y','Y'],
  ['B','G','G','R','R','Y','Y']
];
const ballsGrid = [];

function startGame() {
  detectKeysPressed(character1);
  let slope, x1, x2, y1, y2;
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character1.draw();
    character1.drawAimAssist();
    // Drawing level
    drawLevel(level1);
    
    proyectile.draw();
    if(character1.shooting === true) {
      if(proyectile.y > proyectile.width / 2) {
        proyectile.move();
      }
    } else {
      proyectile.updateSpeed();
    }
  }, 1000 / 60);
  console.log(ballsGrid)
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
        break;
    }
  });
}

function drawLevel(level) {
  if (ballsGrid.length < level.length){
    for (let i = 0; i < level.length; i++) {
        ballsGrid.push([]);
      for (let j = 0; j < level[i].length; j++) {
        switch (level[i][j]) {
          case 'R':
            level[i][j] = 'red';
            break;
          case 'Y':
            level[i][j] = 'yellow';
            break;
          case 'B':
            level[i][j] = 'blue';
            break;
          case 'G':
            level[i][j] = 'green';
            break;
        }
        if (i % 2) {
          ballsGrid[i].push(new EnemyBall((j * 50) + 50, (i * 50) + 25, 50, 50, level[i][j], '', canvas, ctx));
        } else {
          ballsGrid[i].push(new EnemyBall((j * 50) + 25, (i * 50) + 25, 50, 50, level[i][j], '', canvas, ctx));
        }
      }
    }
  }
  ballsGrid.forEach((row) => {
    row.forEach((ball) => {
      ball.draw();
    });
  });
}

startGame();