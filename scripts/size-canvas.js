const canvas = document.querySelector("#main-canvas");

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  console.log("resize");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
