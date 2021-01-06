console.log("getCurrentPosition");

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Votre position actuelle est :');
  console.log('Latitude : '+crd.latitude);
  console.log('Longitude : '+crd.longitude);
  console.log('La précision : '+crd.accuracy);
  console.log('Vitesse : '+crd.speed);
  console.log('TimeStamp : '+crd.timestamp);
}

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

console.log("watchPosition");

var id;

id = navigator.geolocation.watchPosition(success, error, options);
