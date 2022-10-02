import { isColliding } from "./is-colliding.js";
import { explodeAsteroid } from "./explode-asteroid.js";

export function handleCollisions(mapData) {
  if (!mapData.bullets.length) return mapData;

  let newAsteroids = [];
  let newResources = [];

  mapData.bullets = mapData.bullets.filter((bullet) => {
    let collided = false;
    mapData.asteroids = mapData.asteroids.filter((asteroid) => {
      if (isColliding(bullet, asteroid)) {
        collided = true;

        asteroid.durability -= 5;

        if (asteroid.durability > 0) {
          return true;
        }

        const { asteroids, resources } = explodeAsteroid(
          asteroid,
          bullet.speed
        );

        if (asteroids.length) newAsteroids = newAsteroids.concat(asteroids);
        if (resources.length) newResources = newResources.concat(resources);

        return false;
      }
      return true;
    });

    return !collided;
  });

  mapData.asteroids = mapData.asteroids.concat(newAsteroids);
  mapData.resources = mapData.resources.concat(newResources);

  return mapData;
}
