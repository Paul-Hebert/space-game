import { Loop } from "./loop.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { updateParticles } from "./actions/update-particles.js";
import { playerState } from "./state/player-state.js";
import { updateResources } from "./actions/update-resources.js";
import { updateShips } from "./actions/update-ships.js";
import { BaseShip } from "./ships/base.js";
import { mapData } from "./state/map-data.js";
import { random } from "./math/random.js";
import { gameLoop } from "./game-loop.js";

gameLoop.cb = () => {
  updateParticles();

  updateResources();

  updateShips();

  handlePlayerActions();

  handleCollisions();

  paint();
};
gameLoop.play();

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

window.addEventListener("keydown", ({ key }) => {
  if (key === "s") {
    mapData.ships.push(
      new BaseShip({
        x: playerState.x + random(-1000, 1000),
        y: playerState.y + random(-1000, 1000),
      })
    );
  }
});
