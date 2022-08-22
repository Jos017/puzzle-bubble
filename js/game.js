import { Character } from "./Character.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const character1 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, canvas, ctx);
// const character2 = new Character((canvas.width - 50) / 2, canvas.height, 50, -100, '', '', 3, 0, ctx);

function startGame() {
  detectKeysPressed(character1);
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    character1.draw();
    character1.drawAimAssist();
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