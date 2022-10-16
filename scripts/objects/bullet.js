import { Particle } from "./particle.js";

export class Bullet extends Particle {
  constructor({ x, y, speed, fill, maxAge, radius, weapon }) {
    super({ x, y, speed, radius });

    this.fill = fill;
    this.maxAge = maxAge;

    this.weapon = weapon;
  }

  fill = "red";
  age = 0;
  maxAge = 40;
  damage = 10;
}
