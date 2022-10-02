export function moveObject(object) {
  object.x += object.speed.x;
  object.y += object.speed.y;
  return object;
}
