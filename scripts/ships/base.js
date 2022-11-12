import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import { randomInt, random, randomBool } from "../math/random.js";
import { Boom } from "../weapons/boom.js";
import { degreesToRadians } from "../math/degrees-to-radians.js";
import { relativePosition } from "../math/relative-position.js";
import { Exhaust } from "../objects/exhaust.js";
import { positionToTail } from "../math/position-to-ship.js";
import { mapData } from "../state/map-data.js";
import { rotatedDraw } from "../graphics/rotated-draw.js";
import { playCustomSound } from "../sound-effects/play-custom-sound.js";
import { volumeRelativeToPlayer } from "../sound-effects/volume-relative-to-player.js";
import { Resource } from "../objects/resource.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { Explosion } from "../objects/explosion.js";
import { playerState } from "../state/player-state.js";

let shipId = 0;

export class BaseShip {
  constructor({ x = 0, y = 0, speed = { x: 0, y: 0 }, rotation = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.rotation = rotation;

    this.currentGun = randomInt(0, this.weapons.length - 1);

    this.id = shipId;
    shipId++;

    this.resources = [];
    for (
      let i = random(0, this.maxResourceCount + 1);
      i <= this.maxResourceCount;
      i++
    ) {
      this.resources.push(new Resource({}));
    }
  }

  draw(context) {
    this.weapons[this.currentGun].draw(context, this);

    const { x, y } = relativePosition(this);

    rotatedDraw(context, { x, y, rotation: this.rotation }, () => {
      context.drawImage(
        this.graphic,
        x - this.size / 2,
        y - this.size / 2,
        this.size,
        this.size
      );
    });
  }

  addExhaust(distance = 10) {
    const exhaustDirection = degreesToRadians(this.rotation + 90);

    mapData.exhaust.push(
      new Exhaust({
        ...positionToTail(this),
        speed: {
          x: Math.cos(exhaustDirection) * distance,
          y: Math.sin(exhaustDirection) * distance,
        },
      })
    );
  }

  engineNoise() {
    playCustomSound({
      duration: random(1000 / 60, 1000 / 30),
      frequency: random(0, 200),
      volume: random(0.8, 1) * volumeRelativeToPlayer(this),
      nodeType: "triangle",
    });
  }

  explode() {
    playSoundFile("explosion-2", volumeRelativeToPlayer(this));

    const explosions = [];
    for (let i = 0; i < randomInt(this.size / 4, this.size / 2); i++) {
      const angle = random(0, 360);
      const rotationInRadians = degreesToRadians(angle);
      const speed = (Math.min(150, this.size) / 300) * random(1, 10);
      const offset = Math.min(200, this.size) / 100;

      explosions.push(
        new Explosion({
          age: random(-10, 0),
          radius: random(this.size / 10, this.size / 5),
          x: this.x + Math.cos(rotationInRadians) * offset,
          y: this.y + Math.sin(rotationInRadians) * offset,
          speed: {
            x: Math.cos(rotationInRadians) * speed,
            y: Math.sin(rotationInRadians) * speed,
          },
        })
      );

      if (randomBool(0.3)) {
        for (let x = 0; x < random(10, 20); x++) {
          explosions.push(
            new Explosion({
              radius: random(this.size / 30, this.size / 20),
              age: random(-10, 0),
              x: this.x + Math.cos(rotationInRadians) * offset * x * 2,
              y: this.y + Math.cos(rotationInRadians) * offset * x * 2,
              speed: {
                x: Math.cos(rotationInRadians) * speed,
                y: Math.sin(rotationInRadians) * speed,
              },
            })
          );
        }
      }
    }

    const resources = this.resources.map((resource) => {
      resource.x = this.x;
      resource.y = this.y;
      resource.speed = {
        x: random(-3, 3),
        y: random(-3, 3),
      };
      return resource;
    });

    if (randomBool(this.upgradeDropChance)) {
      const gun = this.weapons[this.currentGun];

      const playerHasGun = playerState.weapons.find(
        (weapon) => weapon.name === gun.name
      );
      const gunOnMap = mapData.resources.find(
        (resource) =>
          resource.type === "weapon-upgrade" &&
          resource.upgradeDetails.name === gun.name
      );

      if (!playerHasGun && !gunOnMap) {
        playSoundFile("weapon-dropped");
        const gunUpgrade = new Resource({
          x: this.x,
          y: this.y,
          speed: {
            x: random(-3, 3),
            y: random(-3, 3),
          },
          type: "weapon-upgrade",
          upgradeDetails: gun,
        });

        gunUpgrade.rotation = random(0, 360);
        gunUpgrade.rotationSpeed = random(-3, 3);

        resources.push(gunUpgrade);
      }
    }

    return { explosions, resources };
  }

  graphic = document.getElementById("enemy-ship");

  health = 200;
  maxHealth = 200;

  size = 80;

  rotationSpeed = 3;
  accelerationSpeed = 0.35;

  weapons = [new BaseWeapon(), new Pew(), new Ray(), new Laser(), new Boom()];

  maxSpeed = 10;

  currentGun = 0;

  maxResourceCount = 2;

  upgradeDropChance = 0.15;
}
