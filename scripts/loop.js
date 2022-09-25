let animationFrame = null;

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
  cb();

  animationFrame = requestAnimationFrame(() => {
    doLoopCallback(cb);
  });
}
