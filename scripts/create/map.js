import { createAsteroid } from "./asteroid.js";
import { createStar } from "./star.js";

export function createMap() {
  const asteroids = [];
  for (let i = 0; i < 100; i++) {
    asteroids.push(createAsteroid());
  }

  const stars = [];
  for (let i = 0; i < 2000; i++) {
    stars.push(createStar());
  }

  return {
    bullets: [],
    resources: [],
    exhaust: [],
    asteroids,
    stars,
  };
}
