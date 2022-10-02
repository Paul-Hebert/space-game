import { random, randomInt } from "../math/random.js";
import { mapSize } from "../map-size.js";

export function createAsteroid(config) {
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
    spritePos: {
      x: randomInt(0, 19),
      y: randomInt(0, 19),
    },
  };
}
