import { Ball } from "./Ball.js";

export class ProyectileBall extends Ball {
  constructor(x, y, width, height, color, image, canvas, ctx) {
    super(x, y, width, height, color, image, canvas, ctx);
  }
  rebound() {}
  compareColors() {}
  deleteBalls() {}
  move() {}
}