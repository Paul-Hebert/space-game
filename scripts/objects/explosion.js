import { random } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Explosion extends Particle {
  constructor({ x, y, speed }) {
    super({ x, y, speed, radius: random(1, 10) });
  }

  fill = hsl({
    h: random(0, 50),
    s: random(80, 100),
    l: random(50, 100),
  });

  age = 10;
  maxAge = 10;
}
