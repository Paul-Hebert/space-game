import { Pew } from "../weapons/pew.js";
import { Ray } from "../weapons/ray.js";
import { Laser } from "../weapons/laser.js";
import { BaseWeapon } from "../weapons/base-weapon.js";
import {
  randomInt,
  random,
  randomBool,
  randomItemInArray,
} from "../math/random.js";
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
import { playerState } from "../state/player-state.js";
import { SprayBlaster } from "../weapons/spray-blaster.js";
import { HealthUpgrade } from "../upgrades/health-upgrade.js";
import { WeaponUpgrade } from "../upgrades/weapon-upgrade.js";
import { AccelerationSpeedUpgrade } from "../upgrades/acceleration-upgrade.js";
import { MaxSpeedUpgrade } from "../upgrades/max-speed-upgrade.js";
import { TractorBeamUpgrade } from "../upgrades/tractor-beam-upgrade.js";
import { createExplosion } from "../actions/create-explosion.js";
import { drawCircle } from "../graphics/draw-circle.js";
import { mainCtx } from "../graphics/canvas.js";
import { isJumping } from "../actions/hyper-speed-jump.js";
import { updateShieldBar } from "../hud/update-shield-bar.js";

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
    const { x, y } = relativePosition(this);

    if (this.shields) {
      let shieldOpacity = this.shields / this.maxShields / 3;
      if (isJumping) shieldOpacity /= 5;

      drawCircle(mainCtx, {
        x,
        y,
        radius: (this.size * 3) / 4,
        fill: `hsla(230, 80%, 40%, ${shieldOpacity})`,
        stroke: `hsla(230, 90%, 90%, ${shieldOpacity})`,
      });
    }

    this.weapons[this.currentGun].draw(context, this);

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
      volume: random(0.8, 1.5) * volumeRelativeToPlayer(this),
      nodeType: "triangle",
    });
  }

  explode() {
    playSoundFile("explosion-2", volumeRelativeToPlayer(this));

    const explosions = createExplosion({ ...this, radius: this.size });

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
      playSoundFile("upgrade-dropped");

      if (randomBool(this.upgradeIsWeaponChance)) {
        const gun = this.weapons[this.currentGun];

        const playerHasGun = playerState.weapons.find(
          (weapon) => weapon.name === gun.name
        );
        const gunOnMap = mapData.resources.find(
          (resource) =>
            resource.type === "weapon-upgrade" &&
            resource.upgradeDetails.gun.name === gun.name
        );

        if (!playerHasGun && !gunOnMap) {
          resources.push(this.dropWeaponUpgrade(gun));
        } else {
          resources.push(this.dropShipUpgrade());
        }
      } else {
        resources.push(this.dropShipUpgrade());
      }
    }

    return { explosions, resources };
  }

  dropWeaponUpgrade(gun) {
    const gunUpgrade = new Resource({
      x: this.x,
      y: this.y,
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
      type: "weapon-upgrade",
      upgradeDetails: new WeaponUpgrade(gun),
    });

    gunUpgrade.rotation = random(0, 360);
    gunUpgrade.rotationSpeed = random(-3, 3);

    return gunUpgrade;
  }

  dropShipUpgrade() {
    return new Resource({
      x: this.x,
      y: this.y,
      speed: {
        x: random(-3, 3),
        y: random(-3, 3),
      },
      type: "ship-upgrade",
      upgradeDetails: randomItemInArray([
        new HealthUpgrade(),
        new AccelerationSpeedUpgrade(),
        new MaxSpeedUpgrade(),
        new TractorBeamUpgrade(),
      ]),
    });
  }

  regenerateShields() {
    if (this.maxShields) {
      this.shields++;
      if (this.shields > this.maxShields) {
        this.shields = this.maxShields;
      }
      updateShieldBar();
    }
  }

  graphic = document.getElementById("ship-4");

  health = 200;
  maxHealth = 200;

  size = 80;

  rotationSpeed = 3;
  accelerationSpeed = 0.35;

  weapons = [
    new BaseWeapon(),
    new Pew(),
    new Ray(),
    new Laser(),
    new Boom(),
    new SprayBlaster(),
  ];

  maxSpeed = 10;

  currentGun = 0;

  maxResourceCount = 2;

  upgradeDropChance = 0.25;
  upgradeIsWeaponChance = 0.5;
}
