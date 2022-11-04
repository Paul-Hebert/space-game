import { angledSpeed } from "../math/constrain-speed.js";
import { playerState } from "../state/player-state.js";
import { isJumping } from "../actions/hyper-speed-jump.js";

export const mainCanvas = document.querySelector("#main-canvas");
export const mainCtx = mainCanvas.getContext("2d");
mainCtx.imageSmoothingEnabled = false;

export const miniMapCanvas = document.querySelector("#mini-map-canvas");
export const miniMapCtx = miniMapCanvas.getContext("2d");

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// https://stackoverflow.com/a/58345223/7816145
function resizeCanvas() {
  mainCanvas.width = window.innerWidth * window.devicePixelRatio;
  mainCanvas.height = window.innerHeight * window.devicePixelRatio;

  mainCanvas.style.width = `${window.innerWidth}px`;
  mainCanvas.style.height = `${window.innerHeight}px`;
}

export function clearMainCanvas() {
  if (isJumping && angledSpeed(playerState.speed) > playerState.maxSpeed) {
    mainCtx.globalAlpha = 0.1;

    mainCtx.rect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.fillStyle = "#000";
    mainCtx.fill();

    mainCtx.globalAlpha = 1;
  } else {
    clearCanvas(mainCtx, mainCanvas);
  }
}

export function clearMiniMap() {
  clearCanvas(miniMapCtx, miniMapCanvas);
}

function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
