let getBlobs = (count, radius) => {
  "use strict";

  let blobs = [];

  for (let i = 0; i < count; i++) {
    blobs.push(
      new Blob(
        radius * Math.cos(2.5 * Math.PI / count * i),
        radius * Math.sin(0.5 * Math.PI / count * i),
        radius
      )
    );
  }

  return blobs;
};

function Blob(x, y, radius) {
  "use strict";

  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = radius * 2;

  let context = canvas.getContext("2d");
  context.fillStyle = "#69face";
  context.arc(radius, radius, radius, 0, 2 * Math.PI);
  context.fill();

  this.blob = canvas;
  this.x = x;
  this.y = y;
  this.x0 = x;
  this.y0 = y;
  this.r = radius * radius * 1.6;

  this.animate = (canv, pointer, cont) => {
    let dx = pointer.x - this.x - canv.width * 0.5;
    let dy = pointer.y - this.y - canv.height * 0.5;
    let d = Math.sqrt(dx * dx + dy * dy);

    this.x = this.x - this.r / d * dx / d + (this.x0 - this.x) * 0.5;
    this.y = this.y - this.r / d * dx / d + (this.y0 - this.y) * 0.5;

    let coords = [
      {x: 0.25, y: 0.25},
      {x: 0.25, y: 0.75},
      {x: 0.75, y: 0.25},
      {x: 0.75, y: 0.75},
    ];

    for (let i = 0; i < coords.length; i++) {
      let coord = coords[i];
      let xVal = canv.width * coord.x + this.x - radius;
      let yVal = canv.height * coord.y + this.y - radius;

      cont.drawImage(this.blob, xVal, yVal);
    }
  };
}

(() => {
  "use strict";

  let helper = require("./canvas.js");
  let canvas = helper.getCanvas(document);
  let context = canvas.getContext("2d");
  let pointer = helper.getPointer();
  let state = helper.getStateObject();
  let blobs = getBlobs(100, 50);

  helper.setUpEvents(
    window,
    document,
    canvas,
    helper.getResizeFn(state, canvas),
    helper.getDownFn(document, pointer),
    helper.getUpFn(document, pointer),
    helper.getMoveFn(document, pointer));

  function run() {
    requestAnimationFrame(run);
    context.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(b => {
      b.animate(canvas, pointer, context);
    });
  }

  pointer.y = 10000;
  run();
})();
