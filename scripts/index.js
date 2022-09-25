import { loop } from "./loop.js";
import { pressedKeys } from "./pressed-keys.js";
import { createMap } from "./create-map.js";
import { paint } from "./paint.js";

let count = 0;

const mapData = createMap();

paint(mapData);

const gameLoop = loop(() => {
  count++;

  // paint(mapData);
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    gameLoop.toggle();
  }
});
