import { loop } from "./loop.js";
import { createMap } from "./create-map.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { isColliding } from "./math/is-colliding.js";
import { weapons } from "./weapons.js";
import { updateParticles } from "./actions/update-particles.js";

const resourceCountEl = document.querySelector(".resource-count");

let frameCount = 0;

let mapData = createMap();

let playerState = {
  resourceCount: 0,
  x: 0,
  y: 0,
  rotation: 0,
  speed: {
    x: 0,
    y: 0,
  },
  shipSize: 60,
  rotationSpeed: 2,
  accelerationSpeed: 0.1,
  currentGun: weapons.pew,
};

const gameLoop = loop(() => {
  frameCount++;

  mapData.asteroids = updateParticles(mapData.asteroids);
  mapData.bullets = updateParticles(mapData.bullets, true);
  mapData.exhaust = updateParticles(mapData.exhaust, true);
  mapData.explosions = updateParticles(mapData.explosions, true);

  // TODO: Move collision logic?
  mapData.resources = updateParticles(mapData.resources).filter((resource) => {
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

  mapData = handleCollisions(mapData);

  paint(mapData, playerState);

  const updatedState = handlePlayerActions(playerState, mapData, frameCount);
  playerState = updatedState.playerState;
  mapData = updatedState.mapData;
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    gameLoop.toggle();
  }
});

window.addEventListener("keydown", ({ key }) => {
  if (key === "Shift") {
    playerState.currentGun =
      playerState.currentGun.name === "pew" ? weapons.ray : weapons.pew;
  }
});
