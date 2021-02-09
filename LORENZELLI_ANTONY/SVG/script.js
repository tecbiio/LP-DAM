var x;

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.clearRect(0, 0, 300, 300);

  ctx.save();
  ctx.translate(600, 200);
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0, 0, 142, 0, Math.PI*2, true);
  ctx.stroke();
  ctx.restore();

  // Aiguille des secondes
  ctx.save();
  ctx.translate(600, 200);
  ctx.rotate(x*(Math.PI/30));
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-100, 0);
  ctx.lineTo(100, 0);
  ctx.stroke();
  ctx.restore();

  window.requestAnimationFrame(draw);
}

function deviceOrientationHandler(evt) {
  x = evt.alpha;
}

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
}

init();
