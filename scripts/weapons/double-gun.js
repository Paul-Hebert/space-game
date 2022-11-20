import { BaseWeapon } from "./base-weapon.js";
import { positionForward, positionToSide } from "../math/position-to-ship.js";
import { mapData } from "../state/map-data.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";

export class DoubleGun extends BaseWeapon {
  name = "Refurbished Side Cannons";
  description = "A bit rusty, but there's two of them...";

  damage = 10;
  bulletsPerShot = 5;

  shoot(ship) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    const rightPosition = this.gunPosition(ship);
    const leftPosition = this.gunPosition(ship, "left");

    for (let i = 0; i < this.bulletsPerShot; i++) {
      mapData.bullets.push(
        this.createBullet(
          ship,
          positionForward(leftPosition, ship.rotation, this.bulletRadius * i)
        )
      );
      mapData.bullets.push(
        this.createBullet(
          ship,
          positionForward(rightPosition, ship.rotation, this.bulletRadius * i)
        )
      );
    }
  }

  draw(context, ship) {
    this.drawGun(context, ship, this.gunPosition(ship));
    this.drawGun(context, ship, this.gunPosition(ship, "left"));
  }

  gunPosition(ship, side = "right") {
    return positionToSide(ship, (this.gunSize(ship).y * 2) / 3, side);
  }

  gunMounts = 2;
}
