export class Loop {
  play() {
    this.isPlaying = true;
    this.doLoopCallback();
  }

  pause() {
    this.isPlaying = false;
    cancelAnimationFrame(this.animationFrame);
  }

  toggle() {
    this.isPlaying ? pause() : play();
  }

  doLoopCallback() {
    if (this.isPlaying) {
      this.frameCount++;

      if (this.cb) this.cb();

      this.animationFrame = requestAnimationFrame(() => {
        this.doLoopCallback();
      });
    }
  }

  frameCount = 0;
  animationFrame = null;
  isPlaying = false;
}
