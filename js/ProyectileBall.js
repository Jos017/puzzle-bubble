import { Ball } from "./Ball";

class ProyectileBall extends Ball {
  constructor(x, y, width, height, color, image) {
    super(x, y, width, height, color, image);
  }
  rebound() {}
  compareColors() {}
  deleteBalls() {}
}