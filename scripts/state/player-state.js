import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { GodMode } from "../weapons/god-mode.js";
import { BaseWeapon } from "../weapons/base-weapon.js";

export const playerState = {
  resourceCount: 0,
  x: 0,
  y: 0,
  rotation: 0,
  speed: {
    x: 0,
    y: 0,
  },
  shipSize: 60,
  rotationSpeed: 2,
  accelerationSpeed: 0.1,
  weapons: [new Pew(), new Ray(), new Laser(), new BaseWeapon(), new GodMode()],
  currentGun: 0,
  maxSpeed: 15,
};
