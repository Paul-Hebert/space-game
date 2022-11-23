import { pressedKeys } from "../state/pressed-keys.js";
import { playerState } from "../state/player-state.js";
import { shoot } from "./shoot.js";
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

  if (pressedKeys["ArrowUp"] || pressedKeys["w"] || pressedKeys["W"]) {
    acceleratePlayer();
  }

  if (pressedKeys["a"] || pressedKeys["A"]) {
    acceleratePlayer(true, 1, -90);
  }

  if (pressedKeys["d"] || pressedKeys["D"]) {
    acceleratePlayer(true, 1, 90);
  }

  if (pressedKeys["s"] || pressedKeys["S"]) {
    acceleratePlayer(true, 1, 180);
  }

  if (pressedKeys[" "]) {
    shoot(playerState);
  }

  return playerState;
}
