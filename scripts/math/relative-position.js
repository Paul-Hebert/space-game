import { playerState } from "../state/player-state.js";
import { mainCanvas } from "../graphics/canvas.js";
import { mapSize } from "../map-size.js";

export function relativePosition(object) {
  const depth = object.parallaxDepth || 1;
  const relPos = {
    x: object.x - playerState.x / depth + mainCanvas.width / 2,
    y: object.y - playerState.y / depth + mainCanvas.height / 2,
  };

  // I'm not totally sure why this is necessary
  // but it fixes star looping
  if (depth > 1) {
    relPos.x += mapSize;
    relPos.y += mapSize;
  }

  return relPos;
}
