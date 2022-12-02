import { isColliding } from "../math/is-colliding.js";
import { explodeAsteroid } from "./explode-asteroid.js";
import { random, randomInt } from "../math/random.js";
import { Explosion } from "../objects/explosion.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { showMenu } from "../hud/menus.js";
import { gameStats } from "../state/game-stats.js";
import { displayGameStats } from "./display-game-stats.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { damageShip } from "./damage-ship.js";

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

        newExplosions = newExplosions.concat(bullet.explode());

        if (asteroid.durability > 0) {
          return true;
        }

        const { asteroids, resources, explosions } = explodeAsteroid(
          asteroid,
          bullet.speed,
          playerState
        );

        if (asteroids.length) newAsteroids = newAsteroids.concat(asteroids);
        if (resources.length) newResources = newResources.concat(resources);
        if (explosions.length) newExplosions = newExplosions.concat(explosions);

        return false;
      }
      return true;
    });

    mapData.ships = mapData.ships.filter((ship) => {
      if (
        bullet.shipId !== ship.id &&
        isColliding(bullet, {
          ...ship,
          radius: ship.size / 2,
        })
      ) {
        collided = true;

        damageShip(bullet.damage, ship);

        newExplosions = newExplosions.concat(bullet.explode());

        if (ship.health > 0) {
          return true;
        }

        const { explosions, resources } = ship.explode();
        if (explosions.length) newExplosions = newExplosions.concat(explosions);
        if (resources.length) newResources = newResources.concat(resources);

        gameStats.shipsDestroyed++;

        return false;
      }
      return true;
    });

    if (
      bullet.shipId !== "player" &&
      isColliding(bullet, {
        ...playerState,
        radius: playerState.size / 2,
      })
    ) {
      collided = true;

      newExplosions = newExplosions.concat(bullet.explode());

      damageShip(bullet.damage, playerState);

      if (playerState.health <= 0) {
        playSoundFile("lost-2");
        displayGameStats(".restart-menu");
        showMenu("restart");
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
    }

    return !collided;
  });

  mapData.asteroids = mapData.asteroids.concat(newAsteroids);
  mapData.resources = mapData.resources.concat(newResources);
  mapData.explosions = mapData.explosions.concat(newExplosions);

  return mapData;
}
