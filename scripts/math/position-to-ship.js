import { degreesToRadians } from "./degrees-to-radians.js";

export function positionToNose(ship, offset = 0) {
  const distance = ship.size / 2 + offset;
  return positionForward(ship, ship.rotation, distance);
}

export function positionToTail(ship) {
  const distance = (ship.size / 2) * -1;
  return positionForward(ship, ship.rotation, distance);
}

export function positionForward(startPos, rotation, distance) {
  const rotationInRadians = degreesToRadians(rotation - 90);
  return {
    x: startPos.x + Math.cos(rotationInRadians) * distance,
    y: startPos.y + Math.sin(rotationInRadians) * distance,
  };
}

export function positionToSide(ship, distance, side = "right") {
  return positionHorizontal(ship, ship.rotation, distance, side);
}

export function positionHorizontal(
  startPos,
  rotation,
  distance,
  side = "right"
) {
  if (side === "left") {
    rotation -= 180;
  }

  const rotationInRadians = degreesToRadians(rotation);

  return {
    x: startPos.x + Math.cos(rotationInRadians) * distance,
    y: startPos.y + Math.sin(rotationInRadians) * distance,
  };
}
