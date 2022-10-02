import { loop } from "./loop.js";
import { createMap } from "./create/map.js";
import { paint } from "./paint.js";
import { moveObject } from "./move-object.js";
import "./size-canvas.js";
import { degreesToRadians } from "./degrees-to-radians.js";
import { pressedKeys } from "./pressed-keys.js";
import { handleCollisions } from "./handle-collisions.js";
import { isColliding } from "./is-colliding.js";
import { playSound } from "./play-sound.js";

const resourceCountEl = document.querySelector(".resource-count");

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
  handlePlayerActions(playerState);

  mapData.asteroids = mapData.asteroids.map((asteroid) => moveObject(asteroid));
  mapData.resources = mapData.resources
    .filter((resource) => {
      if (
        isColliding(resource, {
          ...playerState,
          radius: 30,
        })
      ) {
        playerState.resourceCount++;
        resourceCountEl.textContent = playerState.resourceCount;
        return false;
      }
      return true;
    })
    .map((resource) => moveObject(resource));
  mapData.bullets = mapData.bullets
    .filter((bullet) => bullet.age > 0)
    .map((bullet) => {
      bullet.age--;
      return moveObject(bullet);
    });

  mapData = handleCollisions(mapData);

  paint(mapData, playerState);
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
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  if (pressedKeys[" "]) {
    playSound({ duration: 20, frequency: 300, volumne: 1 });
    // I don't understand why -90 is necessary here...
    const rotationInRadians = degreesToRadians(playerState.rotation - 90);
    const shipSize = 15;
    mapData.bullets.push({
      // Starting position is adjusted to be at the "nose" of the ship
      x: Math.cos(rotationInRadians) * shipSize + playerState.x,
      y: Math.sin(rotationInRadians) * shipSize + playerState.y,
      speed: {
        x: playerState.speed.x + Math.cos(rotationInRadians) * 10,
        y: playerState.speed.y + Math.sin(rotationInRadians) * 10,
      },
      radius: 2,
      fill: "red",
      age: 100,
    });
  }
}
