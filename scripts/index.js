import { loop } from "./loop.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { isColliding } from "./math/is-colliding.js";
import { updateParticles } from "./actions/update-particles.js";
import { mapData } from "./state/map-data.js";
import { playerState } from "./state/player-state.js";

const resourceCountEl = document.querySelector(".resource-count");

const gameLoop = loop(() => {
  updateParticles();

  // TODO: move?
  mapData.resources = mapData.resources.filter((resource) => {
    if (
      isColliding(resource, {
        ...playerState,
        radius: 60,
      })
    ) {
      playerState.resourceCount++;
      resourceCountEl.textContent = playerState.resourceCount;
      return false;
    }
    return true;
  });

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
