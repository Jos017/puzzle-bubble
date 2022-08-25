export class Ball {
  constructor(x, y, radius, color, image, canvas, ctx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.image = new Image();
    switch (this.color) {
      case 'red':
        this.image.src = '../images/red-ball.png';
        break;
      case 'blue':
        this.image.src = '../images/blue-ball.png';
        break;
      case 'green':
        this.image.src = '../images/green-ball.png';
        break;
      case 'yellow':
        this.image.src = '../images/yellow-ball.png';
        break;
    }
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
    this.ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
  }
}