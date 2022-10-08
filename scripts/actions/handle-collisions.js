import { isColliding } from "../math/is-colliding.js";
import { explodeAsteroid } from "./explode-asteroid.js";
import { random, randomInt } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Explosion } from "../objects/explosion.js";

export function handleCollisions(mapData) {
  if (!mapData.bullets.length) return mapData;

  let newAsteroids = [];
  let newResources = [];
  let newExplosions = [];

  mapData.bullets = mapData.bullets.filter((bullet) => {
    let collided = false;
    mapData.asteroids = mapData.asteroids.filter((asteroid) => {
      if (isColliding(bullet, asteroid)) {
        collided = true;

        asteroid.durability -= bullet.damage;

        for (let i = 0; i < randomInt(5, 10); i++) {
          newExplosions.push(
            new Explosion({
              x: bullet.x,
              y: bullet.y,
              speed: {
                x: (bullet.speed.x * -1) / random(5, 50),
                y: (bullet.speed.y * -1) / random(5, 50),
              },
            })
          );
        }

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
  mapData.explosions = mapData.explosions.concat(newExplosions);

  return mapData;
}
