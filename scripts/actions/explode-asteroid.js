import { random, randomBool } from "../math/random.js";
import { playSound } from "../play-sound.js";
import { Asteroid } from "../objects/asteroid.js";
import { Resource } from "../objects/resource.js";

const resourceChance = 0.05;

export function explodeAsteroid(asteroid, impactSpeed) {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      playSound({
        duration: random(50, 500),
        frequency: random(50, 200),
        volume: random(1, 3),
        nodeType: "sine",
      });
    }, random(0, 200));
  }

  const asteroids = [];
  const resources = [];

  if (asteroid.radius < 5) {
    return { asteroids, resources };
  }
  let combinedSize = 0;

  while (combinedSize < asteroid.radius) {
    const isResource = randomBool(resourceChance);

    const speed = {
      x: asteroid.speed.x + random(-1, 1) + impactSpeed.x / 50,
      y: asteroid.speed.y + random(-1, 1) + impactSpeed.y / 50,
    };

    if (isResource) {
      resources.push(
        new Resource({
          x: asteroid.x,
          y: asteroid.y,
          speed,
        })
      );
    } else {
      const newSize = random(asteroid.radius / 3, (asteroid.radius * 2) / 3);

      combinedSize += newSize;

      asteroids.push(
        new Asteroid({
          x: asteroid.x,
          y: asteroid.y,
          radius: newSize,
          speed,
        })
      );
    }
  }

  return { asteroids, resources };
}
