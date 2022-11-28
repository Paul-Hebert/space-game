import { positionToMapRight } from "../../math/position-to-map-edge.js";
import { BaseShip } from "../../ships/base.js";
import { DroneSpawner } from "../../weapons/drone-spawner.js";
import { Laser } from "../../weapons/laser.js";
import { Pew } from "../../weapons/pew.js";
import { ShipSpawner } from "../../weapons/ship-spawner.js";
import { boss } from "../types/boss.js";

export function theOverseer() {
  class TheOverseer extends BaseShip {
    health = 2400;
    maxHealth = 2400;
    shields = 2000;
    maxShields = 2000;
    size = 250;

    graphic = document.getElementById("ship-3");

    weapons = [new ShipSpawner()];

    hasBeenHurt = false;
    hasBeenHurtTwice = false;
    hasBeenHurtThrice = false;

    specialBehavior() {
      if (!this.hasBeenHurt && this.shields < this.maxShields) {
        this.hasBeenHurt = true;
        const specialDroneSpawner = new DroneSpawner();
        specialDroneSpawner.reloadSpeed = 50;
        this.weapons = [specialDroneSpawner];
      }
      if (!this.hasBeenHurtTwice && this.health < this.maxHealth) {
        this.hasBeenHurtTwice = true;
        this.weapons = [new Pew()];
      }
      if (!this.hasBeenHurtThrice && this.health < this.maxHealth / 2) {
        this.hasBeenHurtThrice = true;
        this.weapons.push(new Laser());
      }
    }
  }

  boss({
    ship: new TheOverseer(positionToMapRight()),
    heading: "Defeat the Overseer",
  });
}
