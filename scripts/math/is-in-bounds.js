export function isInBounds({ x, y }, { width, height }, buffer = 100) {
  return (
    x > buffer * -1 &&
    x < width + buffer &&
    y > buffer * -1 &&
    y < height + buffer
  );
}
