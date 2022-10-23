import { gameLoop } from "../game-loop.js";
import { playSound } from "../play-sound.js";
import { volumeRelativeToPlayer } from "../play-sound.js";

export function shoot(ship) {
  const gun = ship.weapons[ship.currentGun];
  if (
    gun.lastShotFrame === 0 ||
    gameLoop.frameCount - gun.lastShotFrame > gun.reloadSpeed
  ) {
    gun.lastShotFrame = gameLoop.frameCount;

    playSound("laser", volumeRelativeToPlayer(ship));

    gun.shoot(ship);
  }
}
