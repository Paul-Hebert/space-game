import { gameLoop } from "../game-loop.js";

export function shoot(ship) {
  const gun = ship.weapons[ship.currentGun];
  if (
    gun.lastShotFrame === 0 ||
    gameLoop.frameCount - gun.lastShotFrame > gun.reloadSpeed
  ) {
    gun.lastShotFrame = gameLoop.frameCount;

    gun.shoot(ship);
  }
}
