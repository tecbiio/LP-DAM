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
    var elem;
    var latPos = document.createElement("p");
    var lonPos = document.createElement("p");
    var accPos = document.createElement("p");
    var spePos = document.createElement("p");
    var timPos = document.createElement("p");
    elem = divCoords.appendChild(latPos);
    elem.textContent = 'Latitude : '+crd.latitude;
    elem = divCoords.appendChild(lonPos);
    elem.textContent = 'Longitude : '+crd.longitude;
    elem = divCoords.appendChild(accPos);
    elem.textContent = 'Précision : '+crd.accuracy;
    elem = divCoords.appendChild(spePos);
    elem.textContent = 'Vitesse : '+crd.speed;
    elem = divCoords.appendChild(timPos);
    elem.textContent = 'TimeStamp : '+crd.timestamp;
  }
}

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

//id = navigator.geolocation.watchPosition(success, error, options);

navigator.geolocation.watchPosition(success, error, options);
