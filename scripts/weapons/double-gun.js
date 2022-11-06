import { BaseWeapon } from "./base-weapon.js";
import { positionForward, positionToSide } from "../math/position-to-ship.js";
import { mapData } from "../state/map-data.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";

export class DoubleGun extends BaseWeapon {
  name = "Refurbished Side Cannons";

  damage = 10;

  shoot(ship) {
    this.bulletStream(ship, 5, 2);
    // this.singleShot(ship);
  }

  singleShot(ship) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    mapData.bullets.push(this.createBullet(ship, this.gunPosition(ship)));
    mapData.bullets.push(
      this.createBullet(ship, this.gunPosition(ship, "left"))
    );
  }

  bulletStream(ship, count, distance) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    for (let i = 0; i < count; i++) {
      const rightPosition = this.gunPosition(ship);
      const leftPosition = this.gunPosition(ship, "left");
      mapData.bullets.push(
        this.createBullet(
          ship,

          // leftPosition
          positionForward(leftPosition, ship.rotation, distance * i)
        )
      );
      mapData.bullets.push(
        this.createBullet(
          ship,

          // rightPosition
          positionForward(rightPosition, ship.rotation, distance * i)
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
}
