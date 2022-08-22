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
    this.shooting = false;
  }
  shoot() {
    this.shooting = true;
    console.log('Disparar');
  }
  aimLeft() {
    if (this.pointerX >= 10 && this.pointerY === 0) {
      this.pointerX -= 10;
    } else if (this.pointerX === 0){
      this.pointerY += 10;
    } else if (this.pointerX === canvas.width) {
      this.pointerY -= 10;
    }
    console.log('Apuntar Izquierda');
  }
  aimRight() {
    if (this.pointerX <= canvas.width - 10 && this.pointerY === 0) {
      this.pointerX += 10;
    } else if (this.pointerX === 0) {
      this.pointerY -= 10;
    } else if (this.pointerX === canvas.width) {
      this.pointerY += 10;
    }
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
    this.ctx.beginPath();
    this.ctx.moveTo(canvas.width / 2, canvas.height + this.height / 2);
    this.ctx.lineTo(this.pointerX, this.pointerY);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}