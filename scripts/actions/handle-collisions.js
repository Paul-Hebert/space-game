import { isColliding } from "../math/is-colliding.js";
import { explodeAsteroid } from "./explode-asteroid.js";
import { random, randomInt } from "../math/random.js";
import { Explosion } from "../objects/explosion.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { relativePosition } from "../math/relative-position.js";
import { Resource } from "../objects/resource.js";

export function handleCollisions() {
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

        newExplosions = newExplosions.concat(explodeBullet(bullet));

        if (asteroid.durability > 0) {
          return true;
        }

        const { asteroids, resources } = explodeAsteroid(
          asteroid,
          bullet.speed,
          playerState
        );

        if (asteroids.length) newAsteroids = newAsteroids.concat(asteroids);
        if (resources.length) newResources = newResources.concat(resources);

        return false;
      }
      return true;
    });

    mapData.ships = mapData.ships.filter((ship) => {
      if (
        isColliding(bullet, {
          ...ship,
          radius: ship.shipSize / 2,
        })
      ) {
        collided = true;

        ship.health -= bullet.damage;

        newExplosions = newExplosions.concat(explodeBullet(bullet));

        if (ship.health > 0) {
          return true;
        }

        newExplosions = newExplosions.concat(explodeShip(ship));

        const { explosions, resources } = explodeShip(ship);
        if (explosions.length) newExplosions = newExplosions.concat(explosions);
        if (resources.length) newResources = newResources.concat(resources);

        return false;
      }
      return true;
    });

    if (
      isColliding(bullet, {
        ...playerState,
        radius: playerState.shipSize / 2,
      })
    ) {
      collided = true;

      newExplosions = newExplosions.concat(explodeBullet(bullet));

      playerState.health -= bullet.damage;

      if (playerState.health <= 0) {
        // This isn't working
        // newExplosions = newExplosions.concat(
        //   explodeShip(
        //     relativePosition(
        //       playerState,
        //       playerState,
        //       document.querySelector("canvas")
        //     )
        //   )
        // );
      }

      updateHealthBar();
    }

    return !collided;
  });

  mapData.asteroids = mapData.asteroids.concat(newAsteroids);
  mapData.resources = mapData.resources.concat(newResources);
  mapData.explosions = mapData.explosions.concat(newExplosions);

  return mapData;
}

function explodeBullet(bullet) {
  const newExplosions = [];
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
  return newExplosions;
}

function explodeShip(ship) {
  const explosions = [];
  const resources = [];

  for (let i = 0; i < randomInt(500, 1000); i++) {
    explosions.push(
      new Explosion({
        age: randomInt(-10, 0),
        x: ship.x,
        y: ship.y,
        speed: {
          x: random(-3, 3),
          y: random(-3, 3),
        },
      })
    );
  }

  for (let i = 0; i < randomInt(2, 5); i++) {
    resources.push(
      new Resource({
        x: ship.x,
        y: ship.y,
        speed: {
          x: random(-3, 3),
          y: random(-3, 3),
        },
      })
    );
  }

  return { explosions, resources };
}
