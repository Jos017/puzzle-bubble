export class Character {
  constructor(x, y, width, height, image, name, lives, score, canvas, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image;
    this.image.src = './images/ball-handler.png';
    this.imageSecond = new Image;
    this.imageSecond.src = './images/bobble.png'
    this.name = name;
    this.lives = lives;
    this.score = score;
    this.ctx = ctx;
    this.pointerX = canvas.width / 2;
    this.pointerY = 0;
    this.shooting = false;
    this.counter = 0;
  }
  aimLeft() {
    if (this.pointerX >= 10 && this.pointerY === 0) {
      this.pointerX -= 10;
    } else if (this.pointerX === 0){
      this.pointerY += 10;
    } else if (this.pointerX === canvas.width) {
      this.pointerY -= 10;
    }
  }
  aimRight() {
    if (this.pointerX <= canvas.width - 10 && this.pointerY === 0) {
      this.pointerX += 10;
    } else if (this.pointerX === 0) {
      this.pointerY -= 10;
    } else if (this.pointerX === canvas.width) {
      this.pointerY += 10;
    }
  }
  draw() {
    this.ctx.drawImage(this.imageSecond, this.x - 160, this.y, this.width + 50, this.height);
  }
  drawAimAssist() {
    this.ctx.beginPath();
    this.ctx.moveTo(canvas.width / 2, canvas.height + this.height / 2);
    this.ctx.lineTo(this.pointerX, this.pointerY);
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.drawImage(this.image, this.x - 45, this.y, this.width + 80, this.height);
  }
}