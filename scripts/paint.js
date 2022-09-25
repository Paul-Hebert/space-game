const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

drawCircle(13, 38, 10, "white");

export function paint({ asteroids }) {
  clearCanvas();

  asteroids.forEach((asteroid) => {
    drawCircle(asteroid.x, asteroid.y, asteroid.size, "white");
  });
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(x, y, radius, fill) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    context.fillStyle = fill;
    context.fill();
  }
}
