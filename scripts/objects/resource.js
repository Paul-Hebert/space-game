import { random, randomBool } from "../math/random.js";
import { hsl } from "../graphics/hsl.js";
import { Particle } from "./particle.js";
import { playSoundFile } from "../sound-effects/play-sound-file.js";
import { playerState } from "../state/player-state.js";
import { updateHealthBar } from "../hud/update-health-bar.js";
import { updateResourceCount } from "../hud/update-resource-count.js";
import { showMenu } from "../hud/menus.js";
import { gameLoop } from "../game-loop.js";

export class Resource extends Particle {
  constructor({ x, y, speed, type = null, upgradeDetails = null }) {
    super({ x, y, speed, radius: Math.round(random(8, 12)) });

    this.type = type ? type : randomBool() ? "money" : "health";

    this.upgradeDetails = upgradeDetails;

    if (this.type === "money") {
      this.fill = hsl({
        h: random(40, 55),
        s: random(70, 100),
        l: random(40, 60),
      });
    } else if (this.type === "health") {
      this.fill = hsl({
        h: random(80, 100),
        s: random(70, 100),
        l: random(40, 60),
      });
    } else if (this.type === "weapon-upgrade") {
      this.fill = hsl({
        h: 0,
        s: 0,
        l: 100,
      });
      this.radius = Math.round(random(20, 30));
    }
  }

  handlePickup() {
    playSoundFile("notification-2");

    if (this.type === "health") {
      playerState.health += 100;
      updateHealthBar();
    } else if (this.type === "money") {
      playerState.resourceCount++;
      updateResourceCount();
    } else if (this.type === "weapon-upgrade") {
      showMenu("upgrade");
      gameLoop.pause();
      playerState.weapons.push(this.upgradeDetails);
    }
  }

  age = 0;
  maxAge = 500;

  maxSpeed = 5;
}
