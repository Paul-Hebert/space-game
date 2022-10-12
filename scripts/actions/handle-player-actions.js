import { degreesToRadians } from "../math/degrees-to-radians.js";
import { Exhaust } from "../objects/exhaust.js";
import { pressedKeys } from "../pressed-keys.js";
import { playSound } from "../play-sound.js";
import { mapData } from "../state/map-data.js";
import { playerState } from "../state/player-state.js";
import { frameCount } from "../loop.js";
import { constrainSpeed } from "../math/constrain-speed.js";

let lastShotFrame = 0;

export function handlePlayerActions() {
  if (pressedKeys["ArrowRight"]) {
    playerState.rotation += playerState.rotationSpeed;
  }
  if (pressedKeys["ArrowLeft"]) {
    playerState.rotation -= playerState.rotationSpeed;
  }

  if (pressedKeys["ArrowUp"]) {
    const rotationInRadians = degreesToRadians(playerState.rotation);
    playerState.speed.x +=
      Math.sin(rotationInRadians) * playerState.accelerationSpeed;
    playerState.speed.y +=
      Math.cos(rotationInRadians) * playerState.accelerationSpeed;

    playerState.speed = constrainSpeed(playerState);

    mapData.exhaust.push(
      new Exhaust({
        // Starting position is adjusted to be at the "tail" of the ship
        x:
          playerState.x -
          Math.cos(degreesToRadians(playerState.rotation - 90)) *
            playerState.shipSize,
        y:
          playerState.y -
          Math.sin(degreesToRadians(playerState.rotation - 90)) *
            playerState.shipSize,
        speed: {
          x: Math.cos(degreesToRadians(playerState.rotation + 90)) * 10,
          y: Math.sin(degreesToRadians(playerState.rotation + 90)) * 10,
        },
      })
    );
  }

  playerState.y -= playerState.speed.y;
  playerState.x += playerState.speed.x;

  if (pressedKeys[" "]) {
    const gun = playerState.weapons[playerState.currentGun];
    if (lastShotFrame === 0 || frameCount - lastShotFrame > gun.reloadSpeed) {
      lastShotFrame = frameCount;

      playSound({ duration: 20, frequency: 300, volumne: 1 });

      mapData.bullets = mapData.bullets.concat(gun.shoot(playerState));
    }
  }

  return playerState;
}
