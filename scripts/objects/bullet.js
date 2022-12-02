import { random, randomInt } from "../math/random.js";
import { Explosion } from "./explosion.js";
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

  explode() {
    const newExplosions = [];
    for (let i = 0; i < randomInt(5, 10); i++) {
      newExplosions.push(
        new Explosion({
          x: this.x,
          y: this.y,
          speed: {
            x: (this.speed.x * -1) / random(5, 50),
            y: (this.speed.y * -1) / random(5, 50),
          },
        })
      );
    }
    return newExplosions;
  }
}
