import { random } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Explosion extends Particle {
  constructor({ x, y, speed, age = 0 }) {
    super({ x, y, speed, radius: random(1, 10) });
    this.age = age;
  }

  fill = hsl({
    h: random(0, 50),
    s: random(80, 100),
    l: random(50, 100),
  });

  maxAge = 10;
}
