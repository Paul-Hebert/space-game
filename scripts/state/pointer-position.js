import { angleBetweenPoints } from "../math/angle-between-points.js";

export let pointerPosition = null;

document.addEventListener("pointermove", updatePosition);

function updatePosition(e) {
  {
    pointerPosition = {
      x: e.clientX,
      y: e.clientY,
    };
  }
}

export function pointerPositionFromCenter() {
  if (pointerPosition === null) return null;
  return {
    x: pointerPosition.x - window.innerWidth / 2,
    y: pointerPosition.y - window.innerHeight / 2,
  };
}

export function pointerAngleFromCenter() {
  if (pointerPosition === null) return null;

  return angleBetweenPoints({ x: 0, y: 0 }, pointerPositionFromCenter());
}
