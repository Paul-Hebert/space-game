import { mapData } from "../state/map-data.js";
import { miniMapCtx, clearMiniMap, miniMapCanvas } from "./canvas.js";
import { playerState } from "../state/player-state.js";
import { rotatedDraw } from "./rotated-draw.js";
import { mapSize } from "../map-size.js";
import { drawCircle } from "./draw-circle.js";

const enemyShipGraphic = document.getElementById("minimap-ship-enemy");
const playerShipGraphic = document.getElementById("minimap-ship-player");

export function paintMiniMap() {
  clearMiniMap();

  mapData.ships.forEach((ship) => {
    // TODO: Check if in bounds
    drawMiniMapShip({
      ...ship,
      ...relativeMiniMapPosition(ship),
      size: Math.max(10, ship.size * relativeMiniMapSize()),
      graphic: enemyShipGraphic,
    });
  });

  mapData.resources
    .filter((resource) => resource.type === "weapon-upgrade")
    .forEach((resource) => {
      drawCircle(miniMapCtx, {
        ...relativeMiniMapPosition(resource),
        radius: 5,
        fill: resource.fill,
      });
    });

  drawMiniMapShip({
    ...playerState,
    x: 100,
    y: 100,
    size: 16,
    graphic: playerShipGraphic,
  });
}

function drawMiniMapShip({ x, y, rotation, graphic, size }) {
  rotatedDraw(miniMapCtx, { x, y, rotation }, () => {
    miniMapCtx.drawImage(graphic, x - size / 2, y - size / 2, size, size);
  });
}

function relativeMiniMapSize() {
  return miniMapCanvas.width / mapSize;
}

function relativeMiniMapPosition(ship) {
  const relativeSize = relativeMiniMapSize();
  return {
    x: ((ship.x - playerState.x) * relativeSize) / 4 + 100,
    y: ((ship.y - playerState.y) * relativeSize) / 4 + 100,
  };
}
