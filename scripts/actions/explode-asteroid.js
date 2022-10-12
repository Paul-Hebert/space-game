import { random, randomBool, randomInt } from "../math/random.js";
import { playSound } from "../play-sound.js";
import { Asteroid } from "../objects/asteroid.js";
import { Resource } from "../objects/resource.js";
import { mapSize } from "../map-size.js";

const resourceChance = 0.05;

export function explodeAsteroid(asteroid, impactSpeed, playerState) {
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

  // If it's one of our original asteroids, replace it.
  // This ensures you can't blow up all the asteroids
  if (asteroid.looping) {
    asteroids.push(replaceAsteroid(playerState));
  }

  // Tiny asteroids don't break any further
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

function replaceAsteroid(playerState) {
  // Pick an edge
  // 0 is top, 1 is right, 2 is bottom, 3 is left
  const edge = randomInt(0, 3);
  let speed, x, y;

  if (edge === 0) {
    y = playerState.y - mapSize;
    x = playerState.x + random(mapSize * -1, mapSize);
    speed = {
      x: random(-3, 3),
      y: random(1, 3),
    };
  } else if (edge === 1) {
    x = playerState.x + mapSize;
    y = playerState.y + random(mapSize * -1, mapSize);
    speed = {
      x: random(-3, -1),
      y: random(-3, 3),
    };
  } else if (edge === 2) {
    y = playerState.y + mapSize;
    x = playerState.x + random(mapSize * -1, mapSize);
    speed = {
      x: random(-3, 3),
      y: random(-3, -1),
    };
  } else if (edge === 3) {
    x = playerState.x - mapSize;
    y = playerState.y + random(mapSize * -1, mapSize);
    speed = {
      x: random(1, 3),
      y: random(-3, 3),
    };
  }

  return new Asteroid({
    looping: true,
    speed,
    x,
    y,
  });
}
