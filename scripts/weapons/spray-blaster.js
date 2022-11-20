import { SprayGun } from "./spray-gun.js";

export class SprayBlaster extends SprayGun {
  name = "Mach III Dispersal Agent";
  description = "Not super powerful but it sprays in a wide radius.";

  sprayPoints = [-20, -10, 0, 10, 20];

  reloadSpeed = 10;
  bulletRadius = 8;
  damage = 12;
  bulletsPerShot = 2;
  bulletSpeed = 70;
  bulletColor = "green";
}
