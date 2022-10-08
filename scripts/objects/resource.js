import { random } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Resource extends Particle {
  constructor({ x, y, speed }) {
    super({ x, y, speed, radius: Math.round(random(4, 8)) });
  }

  fill = hsl({ h: random(40, 55), s: random(70, 100), l: random(40, 60) });
}
