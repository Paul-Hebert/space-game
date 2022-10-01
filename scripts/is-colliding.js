// Right now this function assumes everything's a circle
export function isColliding(object1, object2) {
  return (
    Math.hypot(object1.x - object2.x, object1.y - object2.y) <=
    object1.radius + object2.radius
  );
}
