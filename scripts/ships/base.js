import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { randomInt } from "../math/random.js";
import { Boom } from "../weapons/boom.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { positionToNose } from "../math/position-to-nose.js";
import { playerState } from "../state/player-state.js";
import { relativePosition } from "../math/relative-position.js";

export class BaseShip {
  constructor({ x = 0, y = 0, speed = { x: 0, y: 0 }, rotation = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;

    this.currentGun = randomInt(0, this.weapons.length - 1);
  }

  draw(context) {
    this.drawGun(context);

    const { x, y } = relativePosition(
      this,
      playerState,
      document.querySelector("canvas")
    );

    context.translate(x, y);
    context.rotate(degreesToRadians(this.rotation));
    context.translate(-1 * x, -1 * y);

    // Draw the ship
    context.drawImage(
      this.graphic,
      x - this.shipSize / 2,
      y - this.shipSize / 2,
      this.shipSize,
      this.shipSize
    );

    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawGun(context) {
    const gunSize = {
      x: this.shipSize / 5,
      y: this.shipSize / 2,
    };
    const { x, y } = relativePosition(
      positionToNose(this, (gunSize.y * -1) / 5),
      playerState,
      document.querySelector("canvas")
    );

    context.translate(x, y);
    context.rotate(degreesToRadians(this.rotation));
    context.translate(-1 * x, -1 * y);

    // Draw the gun
    context.drawImage(
      this.weapons[this.currentGun].graphic,
      x - gunSize.x / 2,
      y - gunSize.y / 2,
      gunSize.x,
      gunSize.y
    );

    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  graphic = document.getElementById("enemy-ship");

  health = 200;
  maxHealth = 200;

  shipSize = 80;

  rotationSpeed = 3;
  accelerationSpeed = 0.35;

  weapons = [new BaseWeapon(), new Pew(), new Ray(), new Laser(), new Boom()];

  maxSpeed = 10;

  currentGun = 0;
}
