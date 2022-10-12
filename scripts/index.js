import { loop } from "./loop.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { updateParticles } from "./actions/update-particles.js";
import { playerState } from "./state/player-state.js";
import { updateResources } from "./actions/update-resources.js";

const gameLoop = loop(() => {
  updateParticles();

  updateResources();

  handlePlayerActions();

  handleCollisions();

  paint();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    gameLoop.toggle();
  }
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "Shift") {
    playerState.currentGun++;
    if (playerState.currentGun >= playerState.weapons.length) {
      playerState.currentGun = 0;
    }
  }
});
