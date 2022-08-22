import { Ball } from "./Ball.js";

class EnemyBall extends Ball {
  constructor(x, y, width, height, color, image) {
    super(x, y, width, height, color, image);
  }
  fallDown();
}