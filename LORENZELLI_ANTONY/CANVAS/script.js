var compass;
var needle;
var x;

function init() {
  compass = document.getElementById("compass");
  needle = document.getElementById("needle");
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");

  ctx.clearRect(0, 0, 300, 300);

  // Compass
  ctx.drawImage(compass, 500, 100);

  // Needle
  ctx.save();
  ctx.translate(600, 200);
  ctx.rotate(x*(Math.PI/30)); // Formule de rotation à utiliser ???
  ctx.drawImage(needle, -100, -100);
  ctx.restore();

  window.requestAnimationFrame(draw);
}

function deviceOrientationHandler(evt){
  x = evt.alpha;
}

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
}

init();
