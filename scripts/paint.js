const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");

drawCircle(13, 38, 10, "white");

export function paint({ asteroids }, playerPos) {
  clearCanvas();

  asteroids.forEach((asteroid) => {
    // This logic for adjusting for player position is probably wrong
    drawCircle(
      asteroid.x - playerPos.x,
      asteroid.y - playerPos.y,
      asteroid.size,
      "white"
    );
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
