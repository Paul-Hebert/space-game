import { Particle } from "./particle.js";

export class Bullet extends Particle {
  constructor({ x, y, speed, fill, maxAge, radius }) {
    super({ x, y, speed, radius });

    this.fill = fill;
    this.maxAge = maxAge;
  }

  fill = "red";
  age = 0;
  maxAge = 40;
  damage = 10;
}
