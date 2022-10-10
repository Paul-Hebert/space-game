import { BaseBullet } from "./base.js";

export class PewBullet extends BaseBullet {
  age = 0;
  maxAge = 20;
  radius = 4;
  fill = "red";
  damage = 5;
}
