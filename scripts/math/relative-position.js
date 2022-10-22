import { playerState } from "../state/player-state.js";
import { mainCanvas } from "../graphics/canvas.js";

export function relativePosition(object) {
  const depth = object.parallaxDepth || 1;
  return {
    x: object.x - playerState.x / depth + mainCanvas.width / 2,
    y: object.y - playerState.y / depth + mainCanvas.height / 2,
  };
}
