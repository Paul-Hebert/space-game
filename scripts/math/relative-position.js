import { playerState } from "../state/player-state.js";

const canvas = document.querySelector("canvas");

export function relativePosition(object) {
  const depth = object.parallaxDepth || 1;
  return {
    x: object.x - playerState.x / depth + canvas.width / 2,
    y: object.y - playerState.y / depth + canvas.height / 2,
  };
}
