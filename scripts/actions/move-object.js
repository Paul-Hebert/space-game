import { mapSize } from "../map-size.js";

export function moveObject(object, playerState) {
  object.x += object.speed.x;
  object.y += object.speed.y;

  // If the object is meant to "loop" then when it goes way off screen we'll send it
  // to the other edge of the map.
  // This ensures that as you fly you never fly past all the stars/asteroids/etc.
  if (object.looping) {
    if (object.x < playerState.x + mapSize * -1) object.x += mapSize * 2;
    if (object.y < playerState.y + mapSize * -1) object.y += mapSize * 2;
    if (object.x > playerState.x + mapSize) object.x -= mapSize * 2;
    if (object.y > playerState.y + mapSize) object.y -= mapSize * 2;
  }

  return object;
}
