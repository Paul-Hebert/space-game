import { BaseShip } from "./base.js";
import { StarterWeapon } from "../weapons/starter-weapon.js";

export class PlayerShip extends BaseShip {
  graphic = document.getElementById("ship");

  resourceCount = 0;

  maxHealth = 1000;
  health = 1000;

  maxSpeed = 10;

  resourceDrawDistance = 300;
  resourceDrawSpeed = 1;

  id = "player";

  weapons = [new StarterWeapon()];
}
