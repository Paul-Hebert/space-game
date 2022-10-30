import { random } from "../math/random.js";
import {
  disablePlayerControls,
  enablePlayerControls,
} from "../state/player-controls-enabled.js";
import { playerState } from "../state/player-state.js";
import { updateShipAngle } from "../math/update-ship-angle.js";
import { acceleratePlayer } from "./accelerate-player.js";
import { angledSpeed } from "../math/constrain-speed.js";

export let isJumping = false;
export let jumpTarget = null;
export let reachedTarget = false;
let jumpAngle;
let framesJumped;
let jumpCallback = () => {};

export function startHyperSpeedJump(cb) {
  jumpCallback = cb;

  disablePlayerControls();

  isJumping = true;
  jumpAngle = random(0, 90);
  framesJumped = 0;

  reachedTarget = false;
}

function endHyperSpeedJump() {
  enablePlayerControls();
  isJumping = false;
  if (jumpCallback) jumpCallback();
}

export function hyperSpeedJump() {
  framesJumped++;

  if (jumpAngle === playerState.rotation) {
    if (framesJumped <= 100) {
      acceleratePlayer(false, 10);
      return;
    }

    playerState.speed.x /= 2;
    playerState.speed.y /= 2;

    if (angledSpeed(playerState.speed) < playerState.maxSpeed) {
      endHyperSpeedJump();
    }
  } else {
    updateShipAngle(jumpAngle, playerState);
  }
}
