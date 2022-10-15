import { random, randomBool } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Resource extends Particle {
  constructor({ x, y, speed }) {
    super({ x, y, speed, radius: Math.round(random(4, 8)) });

    this.type = randomBool() ? "money" : "health";

    this.fill =
      this.type === "money"
        ? hsl({ h: random(40, 55), s: random(70, 100), l: random(40, 60) })
        : hsl({ h: random(80, 100), s: random(70, 100), l: random(40, 60) });
  }

  maxSpeed = 5;
}
