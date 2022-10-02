import { random } from "../random.js";
import { mapSize } from "../map-size.js";
import { hsl } from "../hsl.js";

export function createAsteroid(config) {
  const color = (config && config.color) || {
    h: 0,
    s: 0,
    l: random(30, 80),
  };
  const fill = hsl(color);

  const radius = (config && config.radius) || Math.round(random(3, 30));
  const durability = radius;

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
    durability,
    speed,
    color,
    fill,
  };
}
