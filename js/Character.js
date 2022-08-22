export class Character {
  constructor(x, y, width, height, image, name, lives, score, ctx) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.name = name;
    this.lives = lives;
    this.score = score;
    this.ctx = ctx;
  }
  shoot() {}
  aim() {}
  selectBall() {}
  win() {}
  lose() {}
  draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  drawAimAssist() {}
}