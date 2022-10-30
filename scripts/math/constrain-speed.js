import { distanceBetweenPoints } from "./distance-between-points.js";

export function constrainSpeed({ speed, maxSpeed }) {
  const speedRelativeToMax = angledSpeed(speed) / maxSpeed;

  if (speedRelativeToMax > 1) {
    speed.x /= speedRelativeToMax;
    speed.y /= speedRelativeToMax;
  }

  return speed;
}

export function angledSpeed(speed) {
  return distanceBetweenPoints({ x: 0, y: 0 }, speed);
}
