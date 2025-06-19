(() => {
  let lastTime = 0;
  const vendors = ["webkit", "moz"];

  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    window.requestAnimationFrame = window[`${vendors[i]}RequestAnimationFrame`];
    window.cancelAnimationFrame =
      window[`${vendors[i]}CancelAnimationFrame`] ||
      window[`${vendors[i]}CancelRequestAnimationFrame`];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
      const currTime = performance.now();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id);
    };
  }
})();
