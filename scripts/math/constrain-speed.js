import { distanceBetweenPoints } from "./distance-between-points.js";

export function constrainSpeed({ speed, maxSpeed }) {
  const angledSpeed = distanceBetweenPoints({ x: 0, y: 0 }, speed);

  const speedRelativeToMax = angledSpeed / maxSpeed;

  if (speedRelativeToMax > 1) {
    speed.x /= speedRelativeToMax;
    speed.y /= speedRelativeToMax;
  }

  return speed;
}
