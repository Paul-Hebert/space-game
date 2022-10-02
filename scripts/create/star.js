import { random } from "../random.js";
import { mapSize } from "../map-size.js";
import { hsl } from "../hsl.js";

export function createStar() {
  return {
    x: random(mapSize * -1, mapSize),
    y: random(mapSize * -1, mapSize),
    radius: Math.round(random(0.5, 2)),
    fill: hsl({
      h: random(0, 360),
      s: random(20, 40),
      l: random(70, 100),
    }),
    parallaxDepth: random(3, 10),
  };
}
