let getBlobs = (count, radius) => {
  "use strict";

  let blobs = [];

  for (let i = 0; i < count; i++) {
    blobs.push(
      new Blob(
        radius * Math.cos(2.5 * Math.PI / count * i),
        radius * Math.sin(0.5 * Math.PI / count * i)));
  }

  return blobs;
};

let getInitialPointer = () => {
  "use strict";

  return {
    x: 0,
    y: 0,
    isDown: false,
    down: null,
    up: null,
    move: null,
  };
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
  this.radius = radius;
}

Blob.prototype.animate = (canvas, pointer, context, radius) => {
  "use strict";

  let dx = pointer.x - this.x - canvas.width * 0.5;
  let dy = pointer.y - this.y - canvas.height * 0.5;
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
    let x = canvas.width * coord.x + this.x - radius;
    let y = canvas.height * coord.y + this.y - radius;

    context.drawImage(this.blob, x, y);
  }
};

(() => {
  "use strict";

  let canvasHelper = require("./canvas.js");
  let canvas = canvasHelper.getCanvas(document);
  let context = canvas.getContext("2d");
  let pointer = getInitialPointer();
  let blobs = getBlobs(100, 50);

  function run() {
    requestAnimationFrame(run);
    context.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(b => {
      b.animate(canvas, pointer, context, b.radius);
    });
  }

  pointer.y = 10000;
  run();
})();
