import { Character } from "./Character.js";
import { ProyectileBall } from "./ProyectileBall.js"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const character1 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, canvas, ctx);
// const character2 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, ctx);
const proyectile = new ProyectileBall(canvas.width / 2, canvas.height + character1.height / 2, 50, 50, '', '', canvas, ctx);

function startGame() {
  detectKeysPressed(character1);
  let slope, x1, x2, y1, y2;
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character1.draw();
    character1.drawAimAssist();
    // console.log(proyectile)
    proyectile.draw();
    if(character1.shooting === true) {
      // pendiente (y1 - y2) / (x1 - x2)
      // ((canvas.height + character1.height / 2) - character1.pointerY) / (canvas.width / 2) - character1.pointerX
      // -y = mx + b
      // x = (y - b) / m
      // b = y - mx
      if (
        proyectile.x > proyectile.width / 2 &&
        proyectile.x < canvas.width - proyectile.width / 2 &&
        proyectile.y > proyectile.width / 2
      ) {
        x1 = canvas.width / 2;
        x2 = character1.pointerX;
        y1 = canvas.height + character1.height / 2;
        y2 = character1.pointerY;
        console.log(x1, y1, x2, y2)
        slope = (y2 - y1) / (x2 - x1);
        proyectile.y -= 10;
        if (slope === -Infinity) {
          proyectile.x = x1;
        } else {
          proyectile.x = (proyectile.y - y1) / slope + x1;
        }
      } else {
        character1.shooting = false;
        proyectile.x = canvas.width / 2;
        proyectile.y = canvas.height + character1.height / 2; 
      }
    }
  }, 1000 / 30);
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

startGame();