import { loop } from "./loop.js";
import { createMap } from "./create-map.js";
import { paint } from "./paint.js";
import { moveObject } from "./move-object.js";
import "./size-canvas.js";
import { degreesToRadians } from "./degrees-to-radians.js";
import { pressedKeys } from "./pressed-keys.js";

const rotationSpeed = 2;
const acceleration = 0.1;

const mapData = createMap();

let playerState = {
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
  mapData.bullets = mapData.bullets.map((bullet) => moveObject(bullet));

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
    const rotationInRadians = degreesToRadians(playerState.rotation - 90);
    mapData.bullets.push({
      x: playerState.x,
      y: playerState.y,
      speed: {
        x: Math.cos(rotationInRadians) * 30,
        y: Math.sin(rotationInRadians) * 30,
      },
    });
  }
}
