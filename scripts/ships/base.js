import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { randomInt } from "../math/random.js";
import { Boom } from "../weapons/boom.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { relativePosition } from "../math/relative-position.js";
import { Exhaust } from "../objects/exhaust.js";
import { positionToTail } from "../math/position-to-ship.js";
import { mapData } from "../state/map-data.js";

let shipId = 0;

export class BaseShip {
  constructor({ x = 0, y = 0, speed = { x: 0, y: 0 }, rotation = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;

    this.currentGun = randomInt(0, this.weapons.length - 1);

    this.id = shipId;
    shipId++;
  }

  draw(context) {
    this.weapons[this.currentGun].draw(context, this);

    const { x, y } = relativePosition(this);

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

  addExhaust() {
    const exhaustDirection = degreesToRadians(this.rotation + 90);

    mapData.exhaust.push(
      new Exhaust({
        ...positionToTail(this),
        speed: {
          x: Math.cos(exhaustDirection) * 10,
          y: Math.sin(exhaustDirection) * 10,
        },
      })
    );
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
