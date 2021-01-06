var optionsGeo = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function successGeo(pos) {
  var crd = pos.coords;

  document.getElementById("lat").innerHTML = 'Latitude : '+crd.latitude;
  document.getElementById("lon").innerHTML = 'Longitude : '+crd.longitude;
  document.getElementById("pre").innerHTML = 'Précision : '+crd.accuracy;
  document.getElementById("spe").innerHTML = 'Vitesse : '+crd.speed;
  document.getElementById("tim").innerHTML = 'TimeStamp : '+crd.timestamp;
}

function errorGeo(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.watchPosition(successGeo, errorGeo, optionsGeo);

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
  document.getElementById("doeSupported").innerText = "Supported!";
}

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler);
  setTimeout(stopJump, 3*1000);
}
