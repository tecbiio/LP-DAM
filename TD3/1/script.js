function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var myimg = document.getElementById("imgMontagne");

  // Montagne
  ctx.drawImage(myimg, 0, 0);

  // Maison (carré)
  ctx.fillStyle = "orange";
  ctx.fillRect(20, 300, 100, 100);

  // Porte (rectangle)
  ctx.fillStyle = "brown";
  ctx.fillRect(70, 350, 30, 50);

  // Toit (triangle)
  ctx.beginPath();
  ctx.moveTo(70, 200);
  ctx.lineTo(20, 300);
  ctx.lineTo(120, 300);
  ctx.closePath();
  ctx.fillStyle = "red";
  ctx.fill();

  // Soleil
  ctx.beginPath();
  ctx.arc(1000, 60, 50, 0, Math.PI * 2, true);
  ctx.strokeStyle = "yellow";
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.stroke();
}
