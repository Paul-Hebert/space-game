import { StasisLaser } from "../weapons/stasis-laser.js";
import { Laser } from "../weapons/laser.js";
import { Pew } from "../weapons/pew.js";
import { Boom } from "../weapons/boom.js";
import { GunShip } from "./archetypes/gunship/gunship.js";

export class FalconShip extends GunShip {
  size = 150;

  shields = 600;
  maxShields = 600;

  health = 1200;
  maxHealth = 1200;

  maxSpeed = 6;
  rotationSpeed = 2;
  accelerationSpeed = 0.25;

  weapons = [new Boom(), new Pew(), new StasisLaser(), new Laser()];
}
