import { degreesToRadians } from "../math/degrees-to-radians.js";

export function rotatedDraw(context, { x, y, rotation }, callback) {
  context.translate(x, y);
  context.rotate(degreesToRadians(rotation));
  context.translate(-1 * x, -1 * y);

  callback();

  context.setTransform(1, 0, 0, 1, 0, 0);
}
