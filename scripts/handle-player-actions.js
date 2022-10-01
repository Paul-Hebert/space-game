import { degreesToRadians } from "./degrees-to-radians.js";
import { pressedKeys } from "./pressed-keys.js";

const rotationSpeed = 2;
const acceleration = 0.1;

export function handlePlayerActions(playerState) {
  if (pressedKeys["ArrowRight"]) {
    playerState.rotation += rotationSpeed;
  }
  if (pressedKeys["ArrowUp"]) {
    const rotationInRadians = degreesToRadians(playerState.rotation);
    playerState.speed.x += Math.sin(rotationInRadians) * acceleration;
    playerState.speed.y += Math.cos(rotationInRadians) * acceleration;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerState.rotation -= rotationSpeed;
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  return playerState;
}
