import { BaseBullet } from "./base.js";

export class RayBullet extends BaseBullet {
  age = 0;
  maxAge = 40;
  radius = 10;
  fill = "blue";
  damage = 10;
}
