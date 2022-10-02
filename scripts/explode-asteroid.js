import { random, randomBool } from "./random.js";
import { hsl } from "./hsl.js";

const resourceChance = 0.05;

export function explodeAsteroid(asteroid, impactSpeed) {
  const asteroids = [];
  const resources = [];

  if (asteroid.radius < 2) {
    return { asteroids, resources };
  }
  let combinedSize = 0;

  while (combinedSize < asteroid.radius) {
    const isResource = randomBool(resourceChance);

    const newSize = isResource
      ? random(2, 5)
      : random(asteroid.radius / 3, asteroid.radius);

    combinedSize += newSize;

    const color = {
      h: isResource ? random(40, 55) : 0,
      s: isResource ? random(70, 100) : 0,
      l: isResource ? random(40, 60) : asteroid.color.l + random(-10, 10),
    };

    const newObject = {
      ...asteroid,
      radius: newSize,
      durability: newSize,
      color,
      fill: hsl(color),
      speed: {
        x: asteroid.speed.x + random(-1, 1) + impactSpeed.x / 20,
        y: asteroid.speed.y + random(-1, 1) + impactSpeed.y / 20,
      },
    };

    if (isResource) {
      resources.push(newObject);
    } else {
      asteroids.push(newObject);
    }
  }

  return { asteroids, resources };
}
