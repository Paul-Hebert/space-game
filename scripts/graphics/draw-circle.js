export function drawCircle(ctx, { x, y, radius, fill, stroke, opacity = 1 }) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (opacity) ctx.globalAlpha = opacity;
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (opacity) ctx.globalAlpha = 1;
}
