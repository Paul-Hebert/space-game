import { Bullet } from "../objects/bullet.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { positionToNose, positionToSide } from "../math/position-to-ship.js";
import { relativePosition } from "../math/relative-position.js";
import { mapData } from "../state/map-data.js";
import { rotatedDraw } from "../graphics/rotated-draw.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";

export class BaseWeapon {
  name = "base";
  speed = 25;
  reloadSpeed = 5;
  bulletRadius = 2;
  bulletColor = "yellow";
  damage = 5;
  maxAge = 30;
  sound = "laser";

  lastShotFrame = null;

  graphic = document.getElementById("gun");

  shoot(ship) {
    this.singleShot(ship);
  }

  singleShot(ship) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    mapData.bullets.push(this.createBullet(ship, this.nosePosition(ship)));
  }

  bulletStream(ship, count, distance) {
    playSoundFile(this.sound, volumeRelativeToPlayer(ship));

    for (let i = 0; i < count; i++) {
      mapData.bullets.push(
        this.createBullet(ship, this.nosePosition(ship, distance * i))
      );
    }
  }

  nosePosition(ship, offset = 0) {
    return positionToNose(ship, offset + this.bulletRadius * 2);
  }

  sidePosition(ship, offset = 0, side = "right") {
    return positionToSide(ship, offset + this.bulletRadius * 2, side);
  }

  createBullet(ship, position) {
    console.log(this.damage);
    return new Bullet({
      ...position,
      speed: this.angledSpeed(ship),
      maxAge: this.maxAge,
      radius: this.bulletRadius,
      fill: this.bulletColor,
      damage: this.damage,
      weapon: this.name,
      shipId: ship.id,
    });
  }

  range() {
    return this.speed * this.maxAge;
  }

  gunSize(ship) {
    return {
      x: ship.size / 5,
      y: ship.size / 2,
    };
  }

  draw(context, ship) {
    this.drawGun(
      context,
      ship,
      positionToNose(ship, (this.gunSize(ship).y * -1) / 5)
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

  angledSpeed(ship, speed) {
    // I don't understand why -90 is necessary here...
    const rotationInRadians = degreesToRadians(ship.rotation - 90);
    return {
      x: Math.cos(rotationInRadians) * this.speed,
      y: Math.sin(rotationInRadians) * this.speed,
    };
  }
}
