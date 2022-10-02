import { isInBounds } from "../math/is-in-bounds.js";
import { relativePosition } from "../math/relative-position.js";

const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");
const ship = document.querySelector(".ship");

let circlesDrawn = 0;

export function paint({ resources, asteroids, bullets, stars }, playerState) {
  circlesDrawn = 0;
  clearCanvas();

  drawPlayer(playerState);

  [...stars, ...asteroids, ...resources].forEach((object) => {
    const pos = relativePosition(object, playerState, canvas);

    if (isInBounds(pos, canvas)) {
      drawCircle({
        ...object,
        ...pos,
      });
    }
  });

  bullets.forEach((bullet) => {
    const pos = relativePosition(bullet, playerState, canvas);

    // if (isInBounds(bullet, canvas)) {
    drawCircle({
      ...bullet,
      ...pos,
      opacity: bullet.age / 100,
    });
    // }
  });

  console.log("circles", circlesDrawn);
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer({ rotation }) {
  ship.style.setProperty("--rotation", `${rotation}deg`);
}

function drawCircle({ x, y, radius, fill, opacity = 1 }) {
  circlesDrawn++;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    context.fillStyle = fill;
    context.globalAlpha = opacity;
    context.fill();
  }
}
