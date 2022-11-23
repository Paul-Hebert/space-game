import { BaseShip } from "./base.js";
import { StarterWeapon } from "../weapons/starter-weapon.js";

export class PlayerShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("ship");

  resourceCount = 0;
  maxHealth = 1300;
  health = 1300;
  maxSpeed = 6;

  resourceDrawDistance = 300;
  resourceDrawSpeed = 1;

  id = "player";

  weapons = [new StarterWeapon()];
}
