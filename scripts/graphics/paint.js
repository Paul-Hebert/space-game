import { isInBounds } from "../math/is-in-bounds.js";
import { relativePosition } from "../math/relative-position.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { mainCanvas, mainCtx, clearCanvas } from "./canvas.js";

const asteroidSprites = document.getElementById("asteroid-sprites");

export function paint() {
  clearCanvas(mainCtx, mainCanvas);

  const { resources, asteroids, bullets, stars, exhaust, explosions } = mapData;

  [
    ...stars,
    ...asteroids,
    ...resources,
    ...exhaust,
    ...explosions,
    ...bullets,
  ].forEach((object) => {
    const premature = object.maxAge && object.age < 0;
    if (!premature) {
      const pos = relativePosition(object);

      if (isInBounds(pos, mainCanvas)) {
        const settings = {
          ...object,
          ...pos,
        };

        if (object.age && object.maxAge) {
          settings.opacity = 1 - object.age / object.maxAge;
        }

        if (object.fill) {
          drawCircle(settings);
        } else if (object.spritePos) {
          drawSprite(
            {
              ...pos,
              radius: object.radius,
              rotation: object.rotation,
            },
            asteroidSprites,
            object.spritePos
          );
        }
      }
    }
  });

  mapData.ships.forEach((ship) => {
    // TODO: Check if in bounds
    ship.draw(mainCtx);
  });

  if (playerState.health > 0) {
    playerState.draw(mainCtx);
  }
}

function drawCircle({ x, y, radius, fill, opacity = 1 }) {
  mainCtx.beginPath();
  mainCtx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    mainCtx.fillStyle = fill;
    if (opacity) mainCtx.globalAlpha = opacity;
    mainCtx.fill();
    if (opacity) mainCtx.globalAlpha = 1;
  }
}

function drawSprite({ x, y, radius, rotation }, sprites, spritePos) {
  mainCtx.translate(x, y);
  mainCtx.rotate(degreesToRadians(rotation));
  mainCtx.translate(-1 * x, -1 * y);

  mainCtx.drawImage(
    sprites, // image
    spritePos.x * 100, // source X
    spritePos.y * 100, // source Y
    100, // source width
    100, // source height
    x - radius, // destination X
    y - radius, // destination Y
    radius * 2, // destination width
    radius * 2 // destination height
  );

  mainCtx.setTransform(1, 0, 0, 1, 0, 0);
}
