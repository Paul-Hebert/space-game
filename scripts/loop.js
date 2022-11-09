export class Loop {
  play() {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.doLoopCallback();
  }

  pause() {
    if (!this.isPlaying) return;

    this.isPlaying = false;
    cancelAnimationFrame(this.animationFrame);
  }

  toggle() {
    this.isPlaying ? this.pause() : this.play();
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

  reset() {
    this.pause();
    this.frameCount = 0;
  }

  frameCount = 0;
  animationFrame = null;
  isPlaying = false;
}
