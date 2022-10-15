import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { randomInt } from "../math/random.js";
import { Boom } from "../weapons/boom.js";

export class BaseShip {
  constructor({ x = 0, y = 0, speed = { x: 0, y: 0 }, rotation = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;

    this.currentGun = randomInt(0, this.weapons.length - 1);
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
