import { Ball } from "./Ball";

class EnemyBall extends Ball {
  constructor(x, y, width, height, color, image) {
    super(x, y, width, height, color, image);
  }
  fallDown();
}