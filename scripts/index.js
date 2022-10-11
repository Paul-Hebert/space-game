import { loop } from "./loop.js";
import { createMap } from "./create-map.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { handlePlayerActions } from "./actions/handle-player-actions.js";
import { isColliding } from "./math/is-colliding.js";
import { updateParticles } from "./actions/update-particles.js";
import { Pew } from "./weapons/pew.js";
import { Ray } from "./weapons/ray.js";
import { Laser } from "./weapons/laser.js";
import { GodMode } from "./weapons/god-mode.js";
import { BaseWeapon } from "./weapons/base-weapon.js";

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
  weapons: [new Pew(), new Ray(), new Laser(), new BaseWeapon(), new GodMode()],
  currentGun: 0,
};

const gameLoop = loop(() => {
  frameCount++;

  mapData = updateParticles(mapData, playerState);

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

  const updatedState = handlePlayerActions(playerState, mapData, frameCount);
  playerState = updatedState.playerState;
  mapData = updatedState.mapData;

  mapData = handleCollisions(mapData);

  paint(mapData, playerState);
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
