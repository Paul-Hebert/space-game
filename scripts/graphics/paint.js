import { isInBounds } from "../math/is-in-bounds.js";
import { relativePosition } from "../math/relative-position.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";

const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

const shipImage = document.getElementById("ship");
const asteroidSprites = document.getElementById("asteroid-sprites");

export function paint() {
  clearCanvas();

  const { resources, asteroids, bullets, stars, exhaust, explosions } = mapData;

  [
    ...stars,
    ...asteroids,
    ...resources,
    ...exhaust,
    ...explosions,
    ...bullets,
  ].forEach((object) => {
    const pos = relativePosition(object, playerState, canvas);

    if (isInBounds(pos, canvas)) {
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
  });

  mapData.ships.forEach((ship) => drawShip(ship));

  if (playerState.health > 0) {
    drawShip(playerState);
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawShip(ship) {
  const { x, y } = relativePosition(ship, playerState, canvas);
  const { rotation, shipSize } = ship;

  context.translate(x, y);
  context.rotate(degreesToRadians(rotation));
  context.translate(-1 * x, -1 * y);

  context.drawImage(
    shipImage, // image
    x - shipSize / 2,
    y - shipSize / 2,
    shipSize,
    shipSize
  );

  context.setTransform(1, 0, 0, 1, 0, 0);
}

function drawCircle({ x, y, radius, fill, opacity = 1 }) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    context.fillStyle = fill;
    if (opacity) context.globalAlpha = opacity;
    context.fill();
    if (opacity) context.globalAlpha = 1;
  }
}

function drawSprite({ x, y, radius, rotation }, sprites, spritePos) {
  context.translate(x, y);
  context.rotate(degreesToRadians(rotation));
  context.translate(-1 * x, -1 * y);

  context.drawImage(
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

  context.setTransform(1, 0, 0, 1, 0, 0);
}
