import { mapData } from "../state/map-data.js";
import { miniMapCtx, clearMiniMap, miniMapCanvas } from "./canvas.js";
import { playerState } from "../state/player-state.js";
import { rotatedDraw } from "./rotated-draw.js";
import { mapSize } from "../map-size.js";
import { drawCircle } from "./draw-circle.js";
import { isInBounds } from "../math/is-in-bounds.js";

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
    .forEach(drawUpgrade);

  drawMiniMapShip({
    ...playerState,
    x: 100,
    y: 100,
    size: 16,
    graphic: playerShipGraphic,
  });
}

function drawMiniMapShip({ x, y, rotation, graphic, size }) {
  if (isInBounds({ x, y }, miniMapCanvas, 0)) {
    rotatedDraw(miniMapCtx, { x, y, rotation }, () => {
      miniMapCtx.drawImage(graphic, x - size / 2, y - size / 2, size, size);
    });
  } else {
    drawOffMapIndicator({ x, y }, "red", size);
  }
}

function drawUpgrade(resource) {
  const radius = 5;
  const pos = relativeMiniMapPosition(resource);

  if (isInBounds(pos, miniMapCanvas, 0)) {
    drawCircle(miniMapCtx, {
      ...pos,
      radius,
      fill: resource.fill,
    });
  } else {
    drawOffMapIndicator(pos, resource.fill, radius);
  }
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

function drawOffMapIndicator({ x, y }, fill, size) {
  const sharedSettings = { radius: 10, fill };
  const { width, height } = miniMapCanvas;

  // Top left corner
  if (x < 0 && y < 0) {
    return drawCircle(miniMapCtx, { x: 0, y: 0, ...sharedSettings });
  }
  // Top right corner
  if (x > width && y < 0) {
    return drawCircle(miniMapCtx, { x: width, y: 0, ...sharedSettings });
  }
  // Bottom right corner
  if (x > width && y > height) {
    return drawCircle(miniMapCtx, { x: width, y: height, ...sharedSettings });
  }
  // Bottom left corner
  if (x < 0 && y > height) {
    return drawCircle(miniMapCtx, { x: 0, y: height, ...sharedSettings });
  }

  // Left edge
  if (x < 0) {
    return drawCircle(miniMapCtx, { x: 0, y, ...sharedSettings });
  }
  // Top edge
  if (y < 0) {
    return drawCircle(miniMapCtx, { x, y: 0, ...sharedSettings });
  }
  // Right edge
  if (x > width) {
    return drawCircle(miniMapCtx, { x: width, y, ...sharedSettings });
  }
  // Bottom edge
  if (y > height) {
    return drawCircle(miniMapCtx, { x, y: height, ...sharedSettings });
  }
}
