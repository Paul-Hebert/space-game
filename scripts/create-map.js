import { mapSize } from "./map-size.js";
import { random } from "./random.js";
import { hsl } from "./hsl.js";

export function createMap() {
  const asteroids = [];

  for (let i = 0; i < 100; i++) {
    const color = {
      h: 0,
      s: 0,
      l: random(30, 80),
    };

    asteroids.push({
      x: random(mapSize * -1, mapSize),
      y: random(mapSize * -1, mapSize),
      radius: Math.round(random(3, 30)),
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
      color,
      fill: hsl(color),
    });
  }

  const stars = [];
  for (let i = 0; i < 2000; i++) {
    stars.push({
      x: random(mapSize * -1, mapSize),
      y: random(mapSize * -1, mapSize),
      radius: Math.round(random(0.5, 2)),
      fill: hsl({
        h: random(0, 360),
        s: random(20, 40),
        l: random(70, 100),
      }),
    });
  }

  return {
    bullets: [],
    resources: [],
    asteroids,
    stars,
  };
}
