export function updateShipAngle(targetAngle, ship) {
  if (targetAngle === ship.rotation) return;

  const diffUp = targetAngle + 360 - ship.rotation;
  const diffDown = ship.rotation - targetAngle;

  if (diffUp < diffDown) {
    ship.rotation += Math.min(ship.rotationSpeed, diffUp);
  } else {
    ship.rotation -= Math.min(ship.rotationSpeed, diffDown);
  }

  if (ship.rotation > 360) {
    ship.rotation -= 360;
  } else if (ship.rotation < 0) {
    ship.rotation += 360;
  }
}
