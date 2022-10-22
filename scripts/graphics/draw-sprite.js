import { degreesToRadians } from "../math/degrees-to-radians.js";
import { rotatedDraw } from "./rotated-draw.js";

export function drawSprite(
  ctx,
  { x, y, radius, rotation },
  sprites,
  spritePos
) {
  rotatedDraw(ctx, { x, y, rotation }, () => {
    ctx.drawImage(
      sprites, // image
      spritePos.x * 100, // source X
      spritePos.y * 100, // source Y
      100, // source width
      100, // source height
      x - radius, // destination X
      y - radius, // destination Y
      radius * 2, // destination width
      radius * 2 // destination height
    );
  });
}
