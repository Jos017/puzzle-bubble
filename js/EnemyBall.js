import { Ball } from "./Ball.js";

export class EnemyBall extends Ball {
  constructor(x, y, width, height, color, image, canvas, ctx) {
    super(x, y, width, height, color, image, canvas, ctx);
  }
  fallDown() {}
}
