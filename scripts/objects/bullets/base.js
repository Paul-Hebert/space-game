import { Particle } from "../particle.js";

export class BaseBullet extends Particle {
  constructor({ x, y, speed }) {
    super({ x, y, speed, radius: 10 });
  }

  fill = "red";
  age = 40;
  maxAge = 40;
  damage = 10;
}
