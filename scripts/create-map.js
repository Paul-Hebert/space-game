import { mapSize } from "./map-size.js";
import { random } from "./random.js";

export function createMap() {
  const asteroids = [];
  for (let i = 0; i < 300; i++) {
    asteroids.push({
      x: random(mapSize * -1, mapSize),
      y: random(mapSize * -1, mapSize),
      radius: Math.round(random(3, 10)),
      fill: `hsl(0, 0%, ${random(30, 80)}%)`,
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
    });
  }

  return {
    bullets: [],
    asteroids,
  };
}
