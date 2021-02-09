var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  document.getElementById("lat").innerHTML = 'Latitude : '+crd.latitude;
  document.getElementById("lon").innerHTML = 'Longitude : '+crd.longitude;
  document.getElementById("pre").innerHTML = 'Précision : '+crd.accuracy;
  document.getElementById("spe").innerHTML = 'Vitesse : '+crd.speed;
  document.getElementById("tim").innerHTML = 'TimeStamp : '+crd.timestamp;
}

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

function handleOrientation(event){
  console.log(event.alpha);
  document.getElementById("alp").innerHTML = 'Alpha : '+event.alpha;
  document.getElementById("bet").innerHTML = 'Beta : '+event.beta;
  document.getElementById("gam").innerHTML = 'Gamma : '+event.gamma;
}

function deviceMotionHandler(evt){
  document.getElementById("rotX").innerHTML = 'Rotation X : '+evt.rotationRate.beta;
  document.getElementById("rotY").innerHTML = 'Rotation Y : '+evt.rotationRate.gamma;
  document.getElementById("rotZ").innerHTML = 'Rotation Z : '+evt.rotationRate.alpha;
  document.getElementById("accX").innerHTML = 'Accélération X : '+evt.acceleration.x;
  document.getElementById("accY").innerHTML = 'Accélération Y : '+evt.acceleration.y;
  document.getElementById("accZ").innerHTML = 'Accélération Z : '+evt.acceleration.z;
}

navigator.geolocation.watchPosition(success, error, options);

window.addEventListener('deviceorientation', handleOrientation);

window.addEventListener('devicemotion', deviceMotionHandler);
