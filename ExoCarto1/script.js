var id;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  var latPos = document.createElementByTag('p');
  latPos.text = 'Latitude : '+crd.latitude;
  var divLat = document.getElementById('divLat');
  divLat.appendChild(latPos);
  
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
