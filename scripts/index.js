import { loop } from "./loop.js";
import { pressedKeys } from "./pressed-keys.js";

let count = 0;

const gameLoop = loop(() => {
  count++;

  console.log("frames", count);
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    gameLoop.toggle();
  }
});
