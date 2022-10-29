import { mapSize } from "../map-size.js";

export function moveObject(object, playerState) {
  object.x += object.speed.x;
  object.y += object.speed.y;

  return object;
}
