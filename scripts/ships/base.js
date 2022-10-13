import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { randomInt } from "../math/random.js";

export class BaseShip {
  constructor({ x = 0, y = 0, speed = { x: 0, y: 0 }, rotation = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;

    this.currentGun = randomInt(0, this.weapons.length - 1);
  }

  health = 100;
  maxHealth = 100;

  shipSize = 80;

  rotationSpeed = 2;

  accelerationSpeed = 0.1;

  weapons = [new BaseWeapon(), new Pew(), new Ray(), new Laser()];

  maxSpeed = 15;

  currentGun = 0;
}
