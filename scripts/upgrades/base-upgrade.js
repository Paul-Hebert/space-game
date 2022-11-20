import { playSoundFile } from "../sound-effects/play-sound-file.js";

export class BaseUpgrade {
  name = "Upgrade Collected";
  description = "You got the default upgrade";
  upgradeAction = () => {};
  draw = null;
  messageContent = () => `
    <h4>${this.name}</h4>
    <p><em>${this.description}</em></p>
  `;
  pickup() {
    playSoundFile("upgrade-pickup");
    this.upgradeAction();
  }
}
