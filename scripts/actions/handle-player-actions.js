import { degreesToRadians } from "../math/degrees-to-radians.js";
import { pressedKeys } from "../state/pressed-keys.js";
import { playerState } from "../state/player-state.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { shoot } from "./shoot.js";
import {
  pointerPosition,
  pointerAngleFromCenter,
} from "../state/pointer-position.js";
import { updateShipAngle } from "../math/update-ship-angle.js";

export function handlePlayerActions() {
  if (pointerPosition) {
    updateShipAngle(pointerAngleFromCenter() + 90, playerState);
  }

  if (pressedKeys["ArrowUp"] || pressedKeys["a"]) {
    const rotationInRadians = degreesToRadians(playerState.rotation);
    playerState.speed.x +=
      Math.sin(rotationInRadians) * playerState.accelerationSpeed;
    playerState.speed.y +=
      Math.cos(rotationInRadians) * playerState.accelerationSpeed;

    playerState.speed = constrainSpeed(playerState);

    playerState.addExhaust();
    playerState.engineNoise();
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  if (pressedKeys[" "] || pressedKeys["s"]) {
    shoot(playerState);
  }

  return playerState;
}
