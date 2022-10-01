export function relativePosition(object, playerState, canvas) {
  return {
    x: object.x - playerState.x + canvas.width / 2,
    y: object.y - playerState.y + canvas.height / 2,
  };
}
