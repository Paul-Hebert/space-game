import { BaseShip } from "./base.js";
import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { GodMode } from "../weapons/god-mode.js";
import { BaseWeapon } from "../weapons/base-weapon.js";

export class PlayerShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  resourceCount = 0;
  maxHealth = 1000;
  health = 1000;

  weapons = [
    new Pew(),
    new BaseWeapon(),
    new Ray(),
    new Laser(),
    new GodMode(),
  ];
}
