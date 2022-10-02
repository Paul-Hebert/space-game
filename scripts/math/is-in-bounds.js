const buffer = 100;

export function isInBounds({ x, y }, { width, height }) {
  return (
    x > buffer * -1 &&
    x < width + buffer &&
    y > buffer * -1 &&
    y < height + buffer
  );
}
