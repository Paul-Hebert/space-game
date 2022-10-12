import { distanceBetweenPoints } from "./distance-between-points.js";
// Right now this function assumes everything's a circle
export function isColliding(object1, object2) {
  return (
    distanceBetweenPoints(object1, object2) <= object1.radius + object2.radius
  );
}
