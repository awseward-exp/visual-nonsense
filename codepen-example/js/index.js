(function() {
  "use strict";

  var canvas = new ge1doot.Canvas();
  var ctx = canvas.ctx;
  var pointer = canvas.pointer;
  var blobs = [],
    Ni = 10,
    rad = 40;
  for (var i = 0; i < Ni; i++) {
    blobs.push(
      new Blob(
        rad * Math.cos((2.5 * Math.PI) / Ni * i),
        rad * Math.sin((0.5 * Math.PI) / Ni * i)
      )
    );
  }

  function Blob(x, y) {
    this.blob = document.createElement('canvas');
    this.blob.width = this.blob.height = rad * 2;
    var ict = this.blob.getContext('2d');
    ict.fillStyle = "#69face";
    ict.arc(rad, rad, rad, 0, 2 * Math.PI);
    ict.fill();
    this.x = x;
    this.y = y;
    this.x0 = x;
    this.y0 = y;
    this.r = rad * rad * 1.6;
  }

  Blob.prototype.anim = function () {
    var dx = pointer.x - this.x - canvas.width * 0.5;
    var dy = pointer.y - this.y - canvas.height * 0.5;
    var d = Math.sqrt(dx * dx + dy * dy);
    this.x = this.x - this.r / d * (dx / d) + (this.x0 - this.x) * 0.5;
    this.y = this.y - this.r / d * (dy / d) + (this.y0 - this.y) * 0.5;

    var coords = [
      {x: 0.25, y: 0.25},
      {x: 0.25, y: 0.75},
      {x: 0.75, y: 0.25},
      {x: 0.75, y: 0.75},
    ];

    for (let i = 0; i < coords.length; i++) {
      let coord = coords[i];
      let x = canvas.width * cood.x + this.x - rad;
      let y = canvas.height * coord.y + this.y - rad;

      ctx.drawImage(this.blob, x, y);
    }
  };

  function loop(el) {
    el.anim();
  }

  function run() {
    requestAnimationFrame(run);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blobs.forEach(loop);
  }
  pointer.y = 100;
  run();
})();
