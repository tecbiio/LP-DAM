var id;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  var divCoords = document.getElementById('divCoords');
  if (divCoords !== null){
    var latPos = document.createElement("p");
    var elem = divCoords.appendChild(latPos);
    latPos.textContent = 'Latitude : '+crd.latitude;
  }

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

id = navigator.geolocation.watchPosition(success, error, options);
