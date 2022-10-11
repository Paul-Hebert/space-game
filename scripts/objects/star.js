import { random } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";

export class Star extends Particle {
  constructor() {
    super({
      radius: Math.round(random(0.5, 2)),
    });
  }

  fill = hsl({
    h: random(0, 360),
    s: random(20, 40),
    l: random(70, 100),
  });

  parallaxDepth = random(3, 10);

  looping = true;
}
