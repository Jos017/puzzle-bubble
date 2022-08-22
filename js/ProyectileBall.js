import { Ball } from "./Ball.js";

export class ProyectileBall extends Ball {
  constructor(x, y, width, height, color, image, canvas, ctx, character) {
    super(x, y, width, height, color, image, canvas, ctx);
    this.character = character;
    this.speedX = 0;
    this.speedY = 0;
  }
  updateSpeed() {
    this.speedX = (this.character.pointerX - this.canvas.width / 2);
    this.speedY = -(this.character.pointerY - this.canvas.height - this.character.height / 2);
  }
  move() {
    this.x += this.speedX / 50;
    this.y -= this.speedY / 50;
    if (this.x >= this.canvas.width - this.width / 2 || this.x <= this.width / 2) {
      this.speedX *= -1;
    }
  }
}