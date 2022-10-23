import { random, randomBool } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Resource extends Particle {
  constructor({ x, y, speed, type = null }) {
    super({ x, y, speed, radius: Math.round(random(8, 12)) });

    this.type = type ? type : randomBool() ? "money" : "health";

    this.fill =
      this.type === "money"
        ? hsl({ h: random(40, 55), s: random(70, 100), l: random(40, 60) })
        : hsl({ h: random(80, 100), s: random(70, 100), l: random(40, 60) });
  }

  age = 0;
  maxAge = 500;

  maxSpeed = 5;
}
