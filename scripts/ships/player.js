import { BaseShip } from "./base.js";
import { StarterWeapon } from "../weapons/starter-weapon.js";

export class PlayerShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("ship");

  resourceCount = 0;
  maxHealth = 1000;
  health = 1000;
  maxSpeed = 11;

  weapons = [new StarterWeapon()];
}
