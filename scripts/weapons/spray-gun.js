import { BaseWeapon } from "./base-weapon.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";
import { mapData } from "../state/map-data.js";

export class SprayGun extends BaseWeapon {
  name = "Sprayer";
  sprayPoints = [-30, 0, 30];

  shoot(ship) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    this.sprayPoints.forEach((point) => {
      for (let i = 0; i < this.bulletsPerShot; i++) {
        mapData.bullets.push(
          this.createBullet(
            ship,
            this.nosePosition(ship, this.bulletRadius * i),
            ship.rotation + point
          )
        );
      }
    });
  }
}
