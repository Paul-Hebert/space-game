import { isInBounds } from "../math/is-in-bounds.js";
import { relativePosition } from "../math/relative-position.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";

const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

const ship = document.querySelector(".ship");
const asteroidSprites = document.getElementById("asteroid-sprites");

export function paint(
  { resources, asteroids, bullets, stars, exhaust, explosions },
  playerState
) {
  clearCanvas();

  drawPlayer(playerState);

  [
    ...stars,
    ...resources,
    ...exhaust,
    ...explosions,
    ...asteroids,
    ...bullets,
  ].forEach((object) => {
    const pos = relativePosition(object, playerState, canvas);

    if (isInBounds(pos, canvas)) {
      const settings = {
        ...object,
        ...pos,
      };

      if (object.age && object.maxAge) {
        settings.opacity = object.age / object.maxAge;
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
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer({ rotation }) {
  ship.style.setProperty("--rotation", `${rotation}deg`);
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
