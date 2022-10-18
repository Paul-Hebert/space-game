import { Bullet } from "../objects/bullet.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { positionToNose, positionToSide } from "../math/position-to-ship.js";
import { relativePosition } from "../math/relative-position.js";

export class BaseWeapon {
  name = "base";
  speed = 25;
  reloadSpeed = 5;
  bulletRadius = 2;
  bulletColor = "yellow";
  damage = 2;
  maxAge = 50;

  lastShotFrame = null;

  graphic = document.getElementById("gun");

  shoot(ship) {
    return this.singleShot(ship);
  }

  singleShot(ship) {
    return [this.createBullet(ship, this.nosePosition(ship))];
  }

  bulletStream(ship, count, distance) {
    const bullets = [];

    for (let i = 0; i < count; i++) {
      bullets.push(
        this.createBullet(ship, this.nosePosition(ship, distance * i))
      );
    }

    return bullets;
  }

  nosePosition(ship, offset = 0) {
    return positionToNose(ship, offset + this.bulletRadius * 2);
  }

  sidePosition(ship, offset = 0, side = "right") {
    return positionToSide(ship, offset + this.bulletRadius * 2, side);
  }

  createBullet(ship, position) {
    return new Bullet({
      ...position,
      speed: angledSpeed(ship, this.speed),
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
      x: ship.shipSize / 5,
      y: ship.shipSize / 2,
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
    context.translate(x, y);
    context.rotate(degreesToRadians(ship.rotation));
    context.translate(-1 * x, -1 * y);

    // Draw the gun
    context.drawImage(
      this.graphic,
      x - this.gunSize(ship).x / 2,
      y - this.gunSize(ship).y / 2,
      this.gunSize(ship).x,
      this.gunSize(ship).y
    );

    context.setTransform(1, 0, 0, 1, 0, 0);
  }
}

function angledSpeed(ship, speed) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(ship.rotation - 90);
  return {
    x: Math.cos(rotationInRadians) * speed,
    y: Math.sin(rotationInRadians) * speed,
  };
}
