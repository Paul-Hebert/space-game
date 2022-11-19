import { Loop } from "./loop.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { updateParticles } from "./actions/update-particles.js";
import { updateResources } from "./actions/update-resources.js";
import { updateShips } from "./actions/update-ships.js";
import { playerState } from "./state/player-state.js";
import { paint } from "./graphics/paint.js";
import { updateMessages } from "./hud/messaging.js";
import { playerControlsEnabled } from "./state/player-controls-enabled.js";
import { hyperSpeedJump, isJumping } from "./actions/hyper-speed-jump.js";

export const gameLoop = new Loop();

gameLoop.cb = () => {
  updateParticles();

  updateShips();

  if (playerState.health > 0) {
    updateResources();

    if (playerControlsEnabled) {
      handlePlayerActions();
    }

    if (isJumping) {
      hyperSpeedJump();
    }

    playerState.y -= playerState.speed.y;
    playerState.x += playerState.speed.x;
  }

  handleCollisions();

  paint();

  if (playerControlsEnabled) updateMessages();
};

gameLoop.play();
