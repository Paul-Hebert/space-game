import { Missile } from "./missile.js";

export class Bomb extends Missile {
  maxSpeed = 0;

  size = 60;

  graphic = document.getElementById("bomb");
}
