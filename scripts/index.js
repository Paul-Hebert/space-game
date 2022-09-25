import { loop } from "./loop.js";
import { pressedKeys } from "./pressed-keys.js";
import { createMap } from "./create-map.js";
import { paint } from "./paint.js";
import "./size-canvas.js";

let count = 0;

const mapData = createMap();

// This assumes our map is 500/500
const playerPos = {
  x: 250,
  y: 250,
};

const gameLoop = loop(() => {
  count++;

  if (pressedKeys["ArrowRight"]) {
    playerPos.x++;
  }
  if (pressedKeys["ArrowUp"]) {
    playerPos.y--;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerPos.x--;
  }
  if (pressedKeys["ArrowDown"]) {
    playerPos.y++;
  }

  paint(mapData, playerPos);
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    gameLoop.toggle();
  }
});
