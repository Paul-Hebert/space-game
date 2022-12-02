import { random } from "../math/random.js";
import { mapSize } from "../map-size.js";

export class Particle {
  constructor({ x, y, radius, speed = null }) {
    this.x = x || random(mapSize * -1, mapSize);
    this.y = y || random(mapSize * -1, mapSize);

    this.radius = radius;
    this.speed = speed;
  }

  looping = false;
  fading = true;
}
