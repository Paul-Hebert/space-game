import { Bullet } from "../objects/bullet.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import {
  positionToNose,
  positionToSide,
  positionToTail,
} from "../math/position-to-ship.js";
import { relativePosition } from "../math/relative-position.js";
import { mapData } from "../state/map-data.js";
import { rotatedDraw } from "../graphics/rotated-draw.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";

export class BaseWeapon {
  name = "Basic Space Ray";
  description = "What can I say? It's a gun...";

  type = "gun";

  speed = 25;
  reloadSpeed = 5;
  bulletRadius = 2;
  bulletColor = "yellow";
  damage = 8;
  maxAge = 30;
  bulletsPerShot = 1;
  sound = "laser";

  lastShotFrame = null;

  graphic = document.getElementById("gun");

  gunMounts = 1;

  shoot(ship) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    for (let i = 0; i < this.bulletsPerShot; i++) {
      mapData.bullets.push(
        this.createBullet(ship, this.nosePosition(ship, this.bulletRadius * i))
      );
    }
  }

  nosePosition(ship, offset = 0) {
    return positionToNose(ship, offset + this.bulletRadius * 2);
  }

  tailPosition(ship, offset = 0) {
    return positionToTail(ship, offset + this.bulletRadius * 2);
  }

  sidePosition(ship, offset = 0, side = "right") {
    return positionToSide(ship, offset + this.bulletRadius * 2, side);
  }

  createBullet(ship, position, rotationOverride = null) {
    return new Bullet({
      ...position,
      speed: this.angledSpeed(rotationOverride || ship.rotation),
      maxAge: this.maxAge,
      radius: this.bulletRadius,
      fill: this.bulletColor,
      damage: this.damage,
      weapon: this.name,
      shipId: ship.id,
    });
  }

  range() {
    return this.bulletsPerShot * this.bulletRadius + this.speed * this.maxAge;
  }

  computedDamagePerShot() {
    return this.bulletsPerShot * this.damage;
  }

  computedReloadSpeed() {
    if (this.reloadSpeed <= 1) {
      return "Instant";
    }

    return `${this.reloadSpeed} frames`;
  }

  gunSize(ship) {
    return {
      x: ship.size / 5,
      y: ship.size / 2,
    };
  }

  draw(context, ship, verticalOffset = true) {
    this.drawGun(
      context,
      ship,
      verticalOffset
        ? positionToNose(ship, (this.gunSize(ship).y * -1) / 5)
        : ship
    );
  }

  drawGun(context, ship, position) {
    const { x, y } = relativePosition(position);
    rotatedDraw(context, { x, y, rotation: ship.rotation }, () => {
      // Draw the gun
      context.drawImage(
        this.graphic,
        x - this.gunSize(ship).x / 2,
        y - this.gunSize(ship).y / 2,
        this.gunSize(ship).x,
        this.gunSize(ship).y
      );
    });
  }

  angledSpeed(rotation) {
    const rotationInRadians = degreesToRadians(rotation - 90);
    return {
      x: Math.cos(rotationInRadians) * this.speed,
      y: Math.sin(rotationInRadians) * this.speed,
    };
  }
}
