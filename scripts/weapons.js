import { PewBullet } from "./objects/bullets/pew.js";
import { RayBullet } from "./objects/bullets/ray.js";
import { BaseBullet } from "./objects/bullets/base.js";

export const weapons = {
  base: {
    name: "base",
    speed: 10,
    reloadSpeed: 10,
    createBullet: (params) => {
      return new BaseBullet(params);
    },
  },
  ray: {
    name: "ray",
    speed: 10,
    reloadSpeed: 1,
    createBullet: (params) => {
      return new RayBullet(params);
    },
  },
  pew: {
    name: "pew",
    speed: 30,
    reloadSpeed: 5,
    createBullet: (params) => {
      return new PewBullet(params);
    },
  },
};
