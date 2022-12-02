import { createExplosion } from "../actions/create-explosion.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";
import { mapData } from "../state/map-data.js";
import { BaseWeapon } from "./base-weapon.js";

export class Bomb extends BaseWeapon {
  speed = 0;
  age = 0;
  maxAge = 100;
  damage = 200;

  reloadSpeed = 50;

  type = "bomb";

  bulletRadius = 30;
  bulletColor = "red";

  shoot(ship) {
    // TODO: Better sound
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    for (let i = 0; i < this.bulletsPerShot; i++) {
      const bullet = this.createBullet(
        ship,
        this.tailPosition(ship, this.bulletRadius * i)
      );

      bullet.explode = () => {
        return createExplosion(bullet, 5);
      };
      bullet.expire = () => {
        mapData.explosions = mapData.explosions.concat(bullet.explode());
      };
      bullet.fading = false;

      mapData.bullets.push(bullet);
    }
  }
}
