import { random } from "./random.js";

export function explodeAsteroid(asteroid, impactSpeed) {
  if (asteroid.radius < 2) {
    return [];
  }

  const newAsteroids = [];
  let combinedSize = 0;

  while (combinedSize < asteroid.radius) {
    const newSize = random(asteroid.radius / 3, asteroid.radius);
    combinedSize += newSize;
    newAsteroids.push({
      ...asteroid,
      radius: newSize,
      speed: {
        x: asteroid.speed.x + random(-1, 1) + impactSpeed.x / 10,
        y: asteroid.speed.y + random(-1, 1) + impactSpeed.y / 10,
      },
    });
  }

  return newAsteroids;
}
