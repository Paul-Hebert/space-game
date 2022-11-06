import { Particle } from "./particle.js";

export class Bullet extends Particle {
  constructor({
    x,
    y,
    speed,
    fill = red,
    maxAge = 40,
    radius,
    weapon,
    shipId,
    damage = 10,
  }) {
    super({ x, y, speed, radius });

    this.fill = fill;
    this.maxAge = maxAge;

    this.weapon = weapon;

    this.shipId = shipId;
    this.damage = damage;
  }

  age = 0;
}
