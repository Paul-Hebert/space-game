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
import { randomBool } from "./math/random.js";
import { gameLoop } from "./game-loop.js";
import { mapSize } from "./map-size.js";

gameLoop.cb = () => {
  updateParticles();

  updateResources();

  if (gameLoop.frameCount % 100 === 0) {
    addShip();
  }

  updateShips();

  if (playerState.health > 0) handlePlayerActions();

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
    addShip();
  }
});

function addShip() {
  const pos = {
    x: playerState.x + mapSize * (randomBool(0.5) ? 1 : -1),
    y: playerState.y + mapSize * (randomBool(0.5) ? 1 : -1),
  };

  console.log(pos);
  mapData.ships.push(new BaseShip(pos));
}
