import { gameLoop } from "./game-loop.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { updateParticles } from "./actions/update-particles.js";
import { updateResources } from "./actions/update-resources.js";
import { updateShips } from "./actions/update-ships.js";
import { resetMap } from "./state/map-data.js";
import { playerState, resetPlayerState } from "./state/player-state.js";
import { addShip } from "./actions/add-ship.js";
import { resetUi } from "./hud/reset-ui.js";

export function newGame() {
  resetMap();
  resetPlayerState();
  resetUi();

  gameLoop.cb = () => {
    updateParticles();

    updateResources();

    if (gameLoop.frameCount % 200 === 0) {
      addShip();
    }

    updateShips();

    if (playerState.health > 0) handlePlayerActions();

    handleCollisions();

    paint();
  };
  gameLoop.reset();
  gameLoop.play();
}
