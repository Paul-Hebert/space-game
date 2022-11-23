import { pressedKeys } from "../state/pressed-keys.js";
import { playerState } from "../state/player-state.js";
import { shoot } from "./shoot.js";
import {
  pointerPosition,
  pointerAngleFromCenter,
} from "../state/pointer-position.js";
import { controlOption } from "../state/control-option.js";
import { acceleratePlayer } from "./accelerate-player.js";
import { constrainSpeed } from "../math/constrain-speed.js";
import { isJumping } from "./hyper-speed-jump.js";

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
    playerState.speed.y += playerState.accelerationSpeed;
    exhaust();
  }

  if (pressedKeys["a"] || pressedKeys["A"]) {
    playerState.speed.x -= playerState.accelerationSpeed;
    exhaust();
  }

  if (pressedKeys["d"] || pressedKeys["D"]) {
    playerState.speed.x += playerState.accelerationSpeed;
    exhaust();
  }

  if (pressedKeys["s"] || pressedKeys["S"]) {
    playerState.speed.y -= playerState.accelerationSpeed;
    exhaust();
  }

  playerState.speed = constrainSpeed(playerState);

  if (pressedKeys[" "]) {
    shoot(playerState);
  }

  return playerState;
}

function exhaust() {
  playerState.addExhaust();
  playerState.engineNoise();
}
