export const mainCanvas = document.querySelector("#main-canvas");
export const mainCtx = mainCanvas.getContext("2d");
mainCtx.imageSmoothingEnabled = false;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// https://stackoverflow.com/a/58345223/7816145
function resizeCanvas() {
  mainCanvas.width = window.innerWidth * window.devicePixelRatio;
  mainCanvas.height = window.innerHeight * window.devicePixelRatio;

  mainCanvas.style.width = `${window.innerWidth}px`;
  mainCanvas.style.height = `${window.innerHeight}px`;
}

export function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
