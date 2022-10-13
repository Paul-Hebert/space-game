import { mapData } from "../state/map-data.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { Exhaust } from "../objects/exhaust.js";

export function addExhaust(ship) {
  mapData.exhaust.push(
    new Exhaust({
      // Starting position is adjusted to be at the "tail" of the ship
      x:
        ship.x -
        (Math.cos(degreesToRadians(ship.rotation - 90)) * ship.shipSize) / 2,
      y:
        ship.y -
        (Math.sin(degreesToRadians(ship.rotation - 90)) * ship.shipSize) / 2,
      speed: {
        x: Math.cos(degreesToRadians(ship.rotation + 90)) * 10,
        y: Math.sin(degreesToRadians(ship.rotation + 90)) * 10,
      },
    })
  );
}
