module.exports = {
  getCanvas: doc => {
    "use strict";

    let canvas = doc.createElement("canvas");
    canvas.onselectstart = () => { return false; };
    canvas.ondrag = () => { return false; };
  },

  getInitialPointer: () => {
    "use strict";

    return {
      x: 0,
      y: 0,
      isDown: false,
      down: null,
      up: null,
      move: null,
    };
  },

  getDownFn: (doc, pointer) => {
    "use strict";

    return (e, touch) => {
      e.preventDefault();

      let ptr = touch ? e.touches[0] : e;

      if (!touch && doc.setCapture) { doc.setCapture(); }

      pointer.x = ptr.clientX;
      pointer.y = ptr.clientY;
      pointer.isDown = true;

      if (pointer.down) { pointer.down(); }
    };
  },

  getUpFn: (doc, pointer) => {
    "use strict";

    return (e, touch) => {
      e.preventDefault();

      if (!touch && doc.releaseCapture) { doc.releaseCapture(); }

      pointer.isDown = false;

      if (pointer.up) { pointer.up(); }
    };
  },

  getMoveFn: (doc, pointer) => {
    "use strict";

    return (e, touch) => {
      e.preventDefault();

      let ptr = touch ? e.touches[0] : e;

      if (!touch && doc.setCapture) { doc.setCapture(); }

      pointer.x = ptr.clientX;
      pointer.y = ptr.clientY;

      if (pointer.move) { pointer.move(); }
    };
  },

  getResizeFn: (something, canvas) => {
    "use strict";

    // Really curious why this identity multiplication is happening here...
    let w = canvas.offsetWidth * 1;
    let h = canvas.offsetHeight * 1;

    if (w !== something.width || h !== something.height) {
      something.width = canvas.width = w;
      something.height = canvas.height = h;

      if (something.resize) { something.resize(); }
    }
  },

  setUpEvents: (win, doc, canvas, resizeFn, downFn, upFn, moveFn) => {
    "use strict";

    win.addEventListener("resize", resizeFn, false);
    resizeFn();

    if ("ontouchstart" in win) {
      canvas.ontouchstart = e => { downFn(e, true); };
      canvas.ontouchmove = e => { moveFn(e, true); };
      canvas.ontouchend = e => { upFn(e, true); };
    }

    doc.addEventListener("mousedown", e => { downFn(e, false); }, true);
    doc.addEventListener("mousemove", e => { moveFn(e, false); }, true);
    doc.addEventListener("mouseup", e => { upFn(e, false); }, true);
  },
};
