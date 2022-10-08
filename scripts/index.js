import { loop } from "./loop.js";
import { createMap } from "./create-map.js";
import { paint } from "./graphics/paint.js";
import "./size-canvas.js";
import { degreesToRadians } from "./math/degrees-to-radians.js";
import { pressedKeys } from "./pressed-keys.js";
import { handleCollisions } from "./actions/handle-collisions.js";
import { isColliding } from "./math/is-colliding.js";
import { playSound } from "./play-sound.js";
import { weapons } from "./weapons.js";
import { Exhaust } from "./objects/exhaust.js";
import { updateParticles } from "./actions/update-particles.js";

let currentGun = weapons.pew;

const resourceCountEl = document.querySelector(".resource-count");

const shipSize = 60;
const rotationSpeed = 2;
const acceleration = 0.1;

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
};

const gameLoop = loop(() => {
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

  handlePlayerActions(playerState);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    gameLoop.toggle();
  }
});

export function handlePlayerActions() {
  if (pressedKeys["ArrowRight"]) {
    playerState.rotation += rotationSpeed;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerState.rotation -= rotationSpeed;
  }

  if (pressedKeys["ArrowUp"]) {
    const rotationInRadians = degreesToRadians(playerState.rotation);
    playerState.speed.x += Math.sin(rotationInRadians) * acceleration;
    playerState.speed.y += Math.cos(rotationInRadians) * acceleration;

    mapData.exhaust.push(
      new Exhaust({
        // Starting position is adjusted to be at the "tail" of the ship
        x:
          playerState.x -
          Math.cos(degreesToRadians(playerState.rotation - 90)) * shipSize,
        y:
          playerState.y -
          Math.sin(degreesToRadians(playerState.rotation - 90)) * shipSize,
        speed: {
          x: Math.cos(degreesToRadians(playerState.rotation + 90)) * 10,
          y: Math.sin(degreesToRadians(playerState.rotation + 90)) * 10,
        },
      })
    );
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  if (pressedKeys[" "]) {
    playSound({ duration: 20, frequency: 300, volumne: 1 });
    // I don't understand why -90 is necessary here...
    const rotationInRadians = degreesToRadians(playerState.rotation - 90);
    mapData.bullets.push(
      currentGun.createBullet({
        // Starting position is adjusted to be at the "nose" of the ship
        x: playerState.x + Math.cos(rotationInRadians) * shipSize,
        y: playerState.y + Math.sin(rotationInRadians) * shipSize,
        speed: {
          x: Math.cos(rotationInRadians) * currentGun.speed,
          y: Math.sin(rotationInRadians) * currentGun.speed,
        },
      })
    );
  }
}

window.addEventListener("keydown", ({ key }) => {
  if (key === "Shift") {
    currentGun = currentGun.name === "pew" ? weapons.ray : weapons.pew;
  }
});
