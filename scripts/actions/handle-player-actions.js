import { degreesToRadians } from "../math/degrees-to-radians.js";
import { pressedKeys } from "../pressed-keys.js";
import { playerState } from "../state/player-state.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { shoot } from "./shoot.js";

export function handlePlayerActions() {
  if (pressedKeys["ArrowRight"]) {
    playerState.rotation += playerState.rotationSpeed;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerState.rotation -= playerState.rotationSpeed;
  }

  if (pressedKeys["ArrowUp"]) {
    const rotationInRadians = degreesToRadians(playerState.rotation);
    playerState.speed.x +=
      Math.sin(rotationInRadians) * playerState.accelerationSpeed;
    playerState.speed.y +=
      Math.cos(rotationInRadians) * playerState.accelerationSpeed;

    playerState.speed = constrainSpeed(playerState);

    playerState.addExhaust();
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  if (pressedKeys[" "]) {
    shoot(playerState);
  }

  return playerState;
}
