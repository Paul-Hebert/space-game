import { BaseShip } from "./base.js";

export class PlayerShip extends BaseShip {
  resourceCount = 0;
  maxHealth = 1000;
  health = 1000;
}
