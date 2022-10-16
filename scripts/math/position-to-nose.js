import { degreesToRadians } from "./degrees-to-radians.js";

export function positionToNose(ship, offset = 0) {
  const rotationInRadians = degreesToRadians(ship.rotation - 90);
  return {
    x: ship.x + Math.cos(rotationInRadians) * (ship.shipSize / 2 + offset),
    y: ship.y + Math.sin(rotationInRadians) * (ship.shipSize / 2 + offset),
  };
}
