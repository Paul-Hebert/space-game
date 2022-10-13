import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { angleBetweenPoints } from "../math/angle-between-points.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { moveObject } from "./move-object.js";
import { addExhaust } from "./add-exhaust.js";
import { distanceBetweenPoints } from "../math/distance-between-points.js";
import { shoot } from "./shoot.js";

export function updateShips() {
  mapData.ships = mapData.ships.map((ship) => {
    ship = moveObject(ship);

    const targetAngle = angleBetweenPoints(ship, playerState) + 90;

    // This doesn't account for wrapping around 360
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

    const acceptableRange = 30;
    if (
      Math.abs(targetAngle - ship.rotation) < acceptableRange ||
      Math.abs(targetAngle - ship.rotation + 360) < acceptableRange
    ) {
      if (
        distanceBetweenPoints(ship, playerState) <
        ship.weapons[ship.currentGun].range()
      ) {
        shoot(ship);
      } else {
        const rotationInRadians = degreesToRadians(ship.rotation - 90);
        ship.speed.x += Math.cos(rotationInRadians) * ship.accelerationSpeed;
        ship.speed.y += Math.sin(rotationInRadians) * ship.accelerationSpeed;

        addExhaust(ship);
      }
    }

    ship.speed = constrainSpeed(ship);

    return ship;
  });
}
