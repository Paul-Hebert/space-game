import { Star } from "./objects/star.js";
import { Asteroid } from "./objects/asteroid.js";

export function createMap() {
  const asteroids = [];
  for (let i = 0; i < 100; i++) {
    asteroids.push(new Asteroid({}));
  }

  const stars = [];
  for (let i = 0; i < 2000; i++) {
    stars.push(new Star());
  }

  return {
    bullets: [],
    resources: [],
    exhaust: [],
    explosions: [],
    asteroids,
    stars,
  };
}
