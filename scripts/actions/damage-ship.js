export function damageShip(damage, ship) {
  let remainingDamage = damage;

  if (ship.shields > 0) {
    remainingDamage -= ship.shields;

    ship.shields -= damage;

    if (ship.shields < 0) ship.shields = 0;
  }

  if (remainingDamage > 0) {
    ship.health -= remainingDamage;
  }
}
