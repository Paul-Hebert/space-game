import { Bullet } from "../objects/bullet.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";

export class BaseWeapon {
  name = "base";
  speed = 10;
  reloadSpeed = 10;
  bulletRadius = 2;
  bulletColor = "yellow";
  damage = 2;
  maxAge = 50;

  shoot(playerState) {
    return [this.createBullet(playerState)];
  }

  bulletStream(playerState, count, distance) {
    const bullets = [];

    for (let i = 0; i < count; i++) {
      bullets.push(this.createBullet(playerState, distance * i));
    }

    return bullets;
  }

  createBullet(playerState, offset = 0) {
    return new Bullet({
      ...positionToNose(playerState, offset),
      speed: angledSpeed(playerState, this.speed),
      maxAge: this.maxAge,
      radius: this.bulletRadius,
      fill: this.bulletColor,
      damage: this.damage,
    });
  }
}

// TODO: Abstract to more generic helper
function positionToNose(playerState, offset = 0) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(playerState.rotation - 90);
  return {
    x:
      playerState.x +
      Math.cos(rotationInRadians) * (playerState.shipSize + offset),
    y:
      playerState.y +
      Math.sin(rotationInRadians) * (playerState.shipSize + offset),
  };
}

function angledSpeed(playerState, speed) {
  // I don't understand why -90 is necessary here...
  const rotationInRadians = degreesToRadians(playerState.rotation - 90);
  return {
    x: Math.cos(rotationInRadians) * speed,
    y: Math.sin(rotationInRadians) * speed,
  };
}
