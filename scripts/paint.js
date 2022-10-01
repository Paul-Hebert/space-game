const canvas = document.querySelector("#main-canvas");
const context = canvas.getContext("2d");
const ship = document.querySelector(".ship");

export function paint({ asteroids, bullets }, playerState) {
  clearCanvas();

  drawPlayer(playerState);

  asteroids.forEach((asteroid) => {
    const relativePosX = asteroid.x - playerState.x + canvas.width / 2;
    const relativePosY = asteroid.y - playerState.y + canvas.height / 2;
    // This logic for adjusting for player position is probably wrong
    drawCircle(relativePosX, relativePosY, asteroid.radius, asteroid.fill);
  });

  bullets.forEach((bullet) => {
    const relativePosX = bullet.x - playerState.x + canvas.width / 2;
    const relativePosY = bullet.y - playerState.y + canvas.height / 2;
    // This logic for adjusting for player position is probably wrong
    drawCircle(relativePosX, relativePosY, 2, "red");
  });
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlayer({ rotation }) {
  ship.style.setProperty("--rotation", `${rotation}deg`);
}

function drawCircle(x, y, radius, fill) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    context.fillStyle = fill;
    context.fill();
  }
}
