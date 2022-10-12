let animationFrame = null;

export let frameCount = 0;

export function loop(cb) {
  doLoopCallback(cb);
  let isPlaying = true;

  function play() {
    isPlaying = true;
    doLoopCallback(cb);
  }

  function pause() {
    isPlaying = false;
    cancelAnimationFrame(animationFrame);
  }

  function toggle() {
    isPlaying ? pause() : play();
  }

  return { isPlaying, toggle, play, pause };
}

function doLoopCallback(cb) {
  frameCount++;
  cb();

  animationFrame = requestAnimationFrame(() => {
    doLoopCallback(cb);
  });
}
