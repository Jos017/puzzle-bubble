import { Ball } from "./Ball.js";

export class ProyectileBall extends Ball {
  constructor(x, y, radius, color, image, canvas, ctx, character) {
    super(x, y, radius, color, image, canvas, ctx);
    this.image = new Image();
    switch (this.color) {
      case 'red':
        this.image.src = './images/red-ball.png';
        break;
      case 'blue':
        this.image.src = './images/blue-ball.png';
        break;
      case 'green':
        this.image.src = './images/green-ball.png';
        break;
      case 'yellow':
        this.image.src = './images/yellow-ball.png';
        break;
    }
    this.character = character;
    this.speedX = 0;
    this.speedY = 0;
    this.moving = false;
    this.collision = false;
    this.audioWall = new Audio('./sounds/pbobble-004.wav');
  }
  updateSpeed() {
    this.speedX = (this.character.pointerX - this.canvas.width / 2);
    this.speedY = -(this.character.pointerY - this.canvas.height - this.character.height / 2);
  }
  move() {
    if(this.moving === true && this.collision === false) {
      this.x += this.speedX / 50;
      this.y -= this.speedY / 50;
      if (this.x >= this.canvas.width - this.radius || this.x <= this.radius) {
        this.speedX *= -1;
        this.audioWall.pause();
        this.audioWall.currentTime = 0.2;
        this.audioWall.play();
      }
    }
  }
}