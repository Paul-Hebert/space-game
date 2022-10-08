import { random, randomInt } from "../math/random.js";
import { Particle } from "./particle.js";

export class Asteroid extends Particle {
  constructor({ x = null, y = null, speed = null, radius = null }) {
    if (radius === null) {
      radius = Math.round(random(20, 100));
    }

    if (speed === null) {
      speed = {
        x: random(-3, 3),
        y: random(-3, 3),
      };
    }

    super({ x, y, speed, radius });

    this.durability = radius;
  }

  spritePos = {
    x: randomInt(0, 19),
    y: randomInt(0, 19),
  };

  rotation = random(0, 360);

  rotationSpeed = random(-3, 3);
}
