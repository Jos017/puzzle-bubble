export class Ball {
  constructor(x, y, width, height, color, image, canvas, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.image = image;
    this.canvas = canvas;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}