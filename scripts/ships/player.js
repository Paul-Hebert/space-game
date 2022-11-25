import { BaseShip } from "./base.js";
import { StarterWeapon } from "../weapons/starter-weapon.js";

export class PlayerShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("ship");

  resourceCount = 0;

  maxHealth = 800;
  health = 800;

  maxShields = 400;
  shields = 400;

  maxSpeed = 10;

  resourceDrawDistance = 300;
  resourceDrawSpeed = 1;

  id = "player";

  weapons = [new StarterWeapon()];
}
