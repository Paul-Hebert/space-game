import { random } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Exhaust extends Particle {
  constructor({ x, y, speed, radius }) {
    super({ x, y, speed, radius: radius || random(5, 15) });
  }

  fill = hsl({
    h: random(0, 50),
    s: random(60, 90),
    l: random(40, 60),
  });

  age = 0;
  maxAge = 10;
}
