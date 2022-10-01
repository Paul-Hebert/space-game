import { loop } from "./loop.js";
import { pressedKeys } from "./pressed-keys.js";
import { createMap } from "./create-map.js";
import { paint } from "./paint.js";
import { degreesToRadians } from "./degrees-to-radians.js";
import "./size-canvas.js";

const rotationSpeed = 2;

const mapData = createMap();

// This assumes our map is 500/500
const playerPos = {
  x: 0,
  y: 0,
  rotation: 0,
  speed: {
    x: 0,
    y: 0,
  },
};

const gameLoop = loop(() => {
  if (pressedKeys["ArrowRight"]) {
    playerPos.rotation += rotationSpeed;
  }
  if (pressedKeys["ArrowUp"]) {
    const acceleration = 0.1;
    const rotationInRadians = degreesToRadians(playerPos.rotation);
    playerPos.speed.x += Math.sin(rotationInRadians) * acceleration;
    playerPos.speed.y += Math.cos(rotationInRadians) * acceleration;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerPos.rotation -= rotationSpeed;
  }

  playerPos.y -= playerPos.speed.y;
  playerPos.x += playerPos.speed.x;

  paint(mapData, playerPos);
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    gameLoop.toggle();
  }
});
