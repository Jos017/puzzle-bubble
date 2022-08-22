export class Character {
  constructor(x, y, width, height, image, name, lives, score, canvas, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.name = name;
    this.lives = lives;
    this.score = score;
    this.ctx = ctx;
    this.pointerX = canvas.width / 2;
    this.pointerY = 0;
  }
  shoot() {
    console.log('Disparar');
  }
  aimLeft() {
    this.ponterX -= 5;
    console.log('Apuntar Izquierda');
  }
  aimRight() {
    this.pointerX += 5;
    console.log('Apuntar Derecha');
  }
  selectBall() {}
  win() {}
  lose() {}
  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  drawAimAssist() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.ctx.beginPath();
    this.ctx.moveTo(canvas.width / 2, canvas.height);
    this.ctx.lineTo(this.pointerX, this.pointerY);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}