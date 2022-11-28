import { pressedKeys } from "../state/pressed-keys.js";
import { playerState } from "../state/player-state.js";
import {
  pointerPosition,
  pointerAngleFromCenter,
} from "../state/pointer-position.js";
import { controlOption } from "../state/control-option.js";
import { acceleratePlayer } from "./accelerate-player.js";

export function handlePlayerActions() {
  if (controlOption === "pointer" && pointerPosition) {
    playerState.rotation = pointerAngleFromCenter() + 90;
  }

  if (controlOption === "keyboard") {
    if (pressedKeys["ArrowRight"]) {
      playerState.rotation += playerState.rotationSpeed;
    }
    if (pressedKeys["ArrowLeft"]) {
      playerState.rotation -= playerState.rotationSpeed;
    }
  }

  if (pressedKeys["ArrowUp"] || pressedKeys["a"] || pressedKeys["A"]) {
    acceleratePlayer();
  }

  if (pressedKeys[" "] || pressedKeys["s"] || pressedKeys["S"]) {
    playerState.shoot();
  }

  return playerState;
}
