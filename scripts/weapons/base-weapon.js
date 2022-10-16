import { Bullet } from "../objects/bullet.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";

export class BaseWeapon {
  name = "base";
  speed = 20;
  reloadSpeed = 5;
  bulletRadius = 2;
  bulletColor = "yellow";
  damage = 2;
  maxAge = 50;

  lastShotFrame = null;

  shoot(ship) {
    return [this.createBullet(ship)];
  }

  bulletStream(ship, count, distance) {
    const bullets = [];

    for (let i = 0; i < count; i++) {
      bullets.push(this.createBullet(ship, distance * i));
    }

    return bullets;
  }

  createBullet(ship, offset = 0) {
    return new Bullet({
      ...positionToNose(ship, offset + this.bulletRadius * 2),
      speed: angledSpeed(ship, this.speed),
      maxAge: this.maxAge,
      radius: this.bulletRadius,
      fill: this.bulletColor,
      damage: this.damage,
      weapon: this.name,
    });
  }

  range() {
    return this.speed * this.maxAge;
  }
}

// TODO: Abstract to more generic helper
function positionToNose(ship, offset = 0) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(ship.rotation - 90);
  return {
    x: ship.x + Math.cos(rotationInRadians) * (ship.shipSize / 2 + offset),
    y: ship.y + Math.sin(rotationInRadians) * (ship.shipSize / 2 + offset),
  };
}

function angledSpeed(ship, speed) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(ship.rotation - 90);
  return {
    x: Math.cos(rotationInRadians) * speed,
    y: Math.sin(rotationInRadians) * speed,
  };
}
