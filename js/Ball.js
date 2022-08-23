export class Ball {
  constructor(x, y, radius, color, image, canvas, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    // this.height = height;
    this.color = color;
    this.image = image;
    this.canvas = canvas;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }
}