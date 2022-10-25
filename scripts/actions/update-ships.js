import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { moveObject } from "./move-object.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";
import { shoot } from "./shoot.js";

export function updateShips() {
  mapData.ships = mapData.ships.map((ship) => {
    ship = moveObject(ship);

    const targetAngle = getTargetAngle(ship);

    if (targetAngle !== ship.rotation) {
      const diffUp = targetAngle + 360 - ship.rotation;
      const diffDown = ship.rotation - targetAngle;

      if (diffUp < diffDown) {
        ship.rotation += Math.min(ship.rotationSpeed, diffUp);
      } else {
        ship.rotation -= Math.min(ship.rotationSpeed, diffDown);
      }

      if (ship.rotation > 360) {
        ship.rotation -= 360;
      } else if (ship.rotation < 0) {
        ship.rotation += 360;
      }
    }

    if (shipIsAimingTowardsPlayer(ship)) {
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
    if (shipIsAimingTowardsPlayer(ship) && playerIsInRange(ship)) {
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

function playerIsInRange(ship) {
  return (
    distanceBetweenPoints(ship, playerState) <
    ship.weapons[ship.currentGun].range()
  );
}

function getTargetAngle(ship) {
  return angleBetweenPoints(ship, playerState) + 90;
}
