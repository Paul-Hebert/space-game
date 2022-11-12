import { BaseShip } from "./base.js";
import { StarterWeapon } from "../weapons/starter-weapon.js";
import { GodMode } from "../weapons/god-mode.js";

export class PlayerShip extends BaseShip {
  constructor(params) {
    super(params);

    this.currentGun = 0;
  }

  graphic = document.getElementById("ship");

  resourceCount = 0;
  maxHealth = 1500;
  health = 1500;
  maxSpeed = 11;

  id = "player";

  weapons = [new GodMode()];
}
