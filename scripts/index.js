import { loop } from "./loop.js";
import { createMap } from "./create-map.js";
import { paint } from "./paint.js";
import { handlePlayerActions } from "./handle-player-actions.js";
import { moveAsteroids } from "./move-asteroids.js";
import "./size-canvas.js";

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
  playerState = handlePlayerActions(playerState);

  mapData.asteroids = moveAsteroids(mapData.asteroids);

  paint(mapData, playerState);
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    gameLoop.toggle();
  }
});
