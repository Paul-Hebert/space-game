const canvas = document.querySelector("#main-canvas");

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// https://stackoverflow.com/a/58345223/7816145
function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
}
