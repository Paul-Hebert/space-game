export function drawCircle(ctx, { x, y, radius, fill, opacity = 1 }) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    ctx.fillStyle = fill;
    if (opacity) ctx.globalAlpha = opacity;
    ctx.fill();
    if (opacity) ctx.globalAlpha = 1;
  }
}
