import { random } from "../math/random.js";
import { mapSize } from "../map-size.js";
import { hsl } from "../graphics/hsl.js";

export function createResource(config) {
  const color = {
    h: random(40, 55),
    s: random(70, 100),
    l: random(40, 60),
  };
  const fill = hsl(color);

  const radius = (config && config.radius) || Math.round(random(4, 8));

  const x = (config && config.x) || random(mapSize * -1, mapSize);
  const y = (config && config.y) || random(mapSize * -1, mapSize);

  const speed = (config && config.speed) || {
    x: random(-3, 3),
    y: random(-3, 3),
  };

  return {
    x,
    y,
    radius,
    speed,
    color,
    fill,
  };
}
