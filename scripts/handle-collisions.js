import { isColliding } from "./is-colliding.js";
import { explodeAsteroid } from "./explode-asteroid.js";

export function handleCollisions(mapData) {
  if (!mapData.bullets.length) return mapData;

  let newAsteroids = [];

  mapData.bullets = mapData.bullets.filter((bullet) => {
    let collided = false;
    mapData.asteroids = mapData.asteroids.filter((asteroid) => {
      if (isColliding(bullet, asteroid)) {
        collided = true;
        newAsteroids = newAsteroids.concat(
          explodeAsteroid(asteroid, bullet.speed)
        );
        return false;
      }
      return true;
    });

    return !collided;
  });

  mapData.asteroids = mapData.asteroids.concat(newAsteroids);

  return mapData;
}
