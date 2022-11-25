import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { moveObject } from "./move-object.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";
import { shoot } from "./shoot.js";
import { updateShipAngle } from "../math/update-ship-angle.js";
import { gameLoop } from "../game-loop.js";

export function updateShips() {
  mapData.ships = mapData.ships.map((ship) => {
    if (gameLoop.frameCount % 10) {
      ship.regenerateShields();
    }

    ship = moveObject(ship);

    const targetAngle = getTargetAngle(ship);

    updateShipAngle(targetAngle, ship);

    if (shipIsAimingTowardsPlayer(ship)) {
      if (ship.weapons.length > 0) {
        // TODO: Do this in ship initialization!
        const weaponsByRange = ship.weapons.sort((a, b) => {
          return a.range() > b.range();
        });

        for (let i = 0; i < ship.weapons.length; i++) {
          if (playerIsInRange(ship, weaponsByRange[i].range())) {
            ship.currentGun = i;
            break;
          }
        }
      }

      if (!playerIsInRange(ship)) {
        const rotationInRadians = degreesToRadians(ship.rotation - 90);
        ship.speed.x += Math.cos(rotationInRadians) * ship.accelerationSpeed;
        ship.speed.y += Math.sin(rotationInRadians) * ship.accelerationSpeed;

        ship.addExhaust();
        ship.engineNoise();
      }
    }

    ship.speed = constrainSpeed(ship);

    return ship;
  });

  mapData.ships.forEach((ship) => {
    if (
      shipIsAimingTowardsPlayer(ship) &&
      playerIsInRange(ship) &&
      playerState.health > 0
    ) {
      shoot(ship);
    }
  });
}

function shipIsAimingTowardsPlayer(ship) {
  const targetAngle = getTargetAngle(ship);
  const acceptableRange = 30;
  return (
    Math.abs(targetAngle - ship.rotation) < acceptableRange ||
    Math.abs(targetAngle - ship.rotation - 360) < acceptableRange ||
    Math.abs(targetAngle + ship.rotation - 360) < acceptableRange
  );
}

function playerIsInRange(ship, range = ship.weapons[ship.currentGun].range()) {
  return distanceBetweenPoints(ship, playerState) < range;
}

function getTargetAngle(ship) {
  return angleBetweenPoints(ship, playerState) + 90;
}
