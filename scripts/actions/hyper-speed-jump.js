import { random } from "../math/random.js";
import {
  disablePlayerControls,
  enablePlayerControls,
} from "../state/player-controls-enabled.js";
import { playerState } from "../state/player-state.js";
import { updateShipAngle } from "../math/update-ship-angle.js";
import { acceleratePlayer } from "./accelerate-player.js";
import { angledSpeed } from "../math/constrain-speed.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { mapData } from "../state/map-data.js";

export let isJumping = false;
export let jumpTarget = null;
export let reachedTarget = false;
export let framesJumped;
let jumpAngle;
let jumpCallback = () => {};

export function startHyperSpeedJump(cb) {
  playSoundFile("hyper-speed");

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

  if (playerState.health < playerState.maxHealth) {
    playerState.health = playerState.maxHealth;
    updateHealthBar();
  }

  // Wipe out anything from the last sector so it doesn't show on the minimap
  mapData.ships = [];
  mapData.resources = [];

  if (jumpCallback) jumpCallback();
}

export function hyperSpeedJump() {
  framesJumped++;

  if (playerState.health < playerState.maxHealth) {
    playerState.health += 10;
    updateHealthBar();
  }

  if (jumpAngle === playerState.rotation) {
    if (framesJumped <= 100) {
      acceleratePlayer(false, 5);
      return;
    }

    if (framesJumped > 150) {
      playerState.speed.x *= 9 / 10;
      playerState.speed.y *= 9 / 10;

      if (angledSpeed(playerState.speed) < playerState.maxSpeed / 4) {
        endHyperSpeedJump();
      }
    }
  } else {
    updateShipAngle(jumpAngle, playerState);
  }
}
