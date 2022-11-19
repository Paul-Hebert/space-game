import { SprayGun } from "./spray-gun.js";

export class SprayBlaster extends SprayGun {
  name = "Jumbo Sprayer";
  sprayPoints = [-30, -15, 0, 15, 30];

  reloadSpeed = 15;
  bulletRadius = 8;
  damage = 12;
  bulletsPerShot = 3;
  bulletColor = "green";
}
