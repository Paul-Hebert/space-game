import { gameLoop } from "../game-loop.js";
import { playSound } from "../play-sound.js";
import { mapData } from "../state/map-data.js";

export function shoot(ship) {
  const gun = ship.weapons[ship.currentGun];
  if (
    gun.lastShotFrame === 0 ||
    gameLoop.frameCount - gun.lastShotFrame > gun.reloadSpeed
  ) {
    gun.lastShotFrame = gameLoop.frameCount;

    playSound({ duration: 20, frequency: 300, volumne: 1 });

    mapData.bullets = mapData.bullets.concat(gun.shoot(ship));
  }
}
