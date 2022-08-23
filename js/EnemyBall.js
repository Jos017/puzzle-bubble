import { Ball } from "./Ball.js";

export class EnemyBall extends Ball {
  constructor(x, y, radius, color, image, canvas, ctx) {
    super(x, y, radius, color, image, canvas, ctx);
    this.display = false;
  }
  showBall() {
    this.display = true
  }
  draw() {
    if (this.display === true) {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
  fallDown() {}
}
