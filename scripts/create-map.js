import { mapSize } from "./map-size.js";
import { random } from "./random.js";

export function createMap() {
  const asteroids = [];
  for (let i = 0; i < 1000; i++) {
    asteroids.push({
      x: random(mapSize * -1, mapSize),
      y: random(mapSize * -1, mapSize),
      size: Math.round(random(3, 10)),
    });
  }

  return {
    asteroids,
  };
}
