import { Ball } from "./Ball.js";

export class ProyectileBall extends Ball {
  constructor(x, y, radius, color, image, canvas, ctx, character) {
    super(x, y, radius, color, image, canvas, ctx);
    this.character = character;
    this.speedX = 0;
    this.speedY = 0;
    this.moving = false;
  }
  updateSpeed() {
    this.speedX = (this.character.pointerX - this.canvas.width / 2);
    this.speedY = -(this.character.pointerY - this.canvas.height - this.character.height / 2);
  }
  move() {
    if(this.moving === true) {
      this.x += this.speedX / 50;
      this.y -= this.speedY / 50;
      if (this.x >= this.canvas.width - this.radius || this.x <= this.radius) {
        this.speedX *= -1;
      }
    }
  }
}