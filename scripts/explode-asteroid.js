import { random } from "./random.js";
import { hsl } from "./hsl.js";

export function explodeAsteroid(asteroid, impactSpeed) {
  if (asteroid.radius < 2) {
    return [];
  }

  const newAsteroids = [];
  let combinedSize = 0;

  while (combinedSize < asteroid.radius) {
    const newSize = random(asteroid.radius / 3, asteroid.radius);
    combinedSize += newSize;
    const color = {
      h: 0,
      s: 0,
      l: asteroid.color.l + random(-10, 10),
    };
    newAsteroids.push({
      ...asteroid,
      radius: newSize,
      color,
      fill: hsl(color),
      speed: {
        x: asteroid.speed.x + random(-1, 1) + impactSpeed.x / 20,
        y: asteroid.speed.y + random(-1, 1) + impactSpeed.y / 20,
      },
    });
  }

  return newAsteroids;
}
