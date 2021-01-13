var container = false;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var coords = pos.coords;

  document.getElementById("lat").innerHTML = 'Latitude : '+coords.latitude;
  document.getElementById("lon").innerHTML = 'Longitude : '+coords.longitude;
  document.getElementById("pre").innerHTML = 'Précision : '+coords.accuracy;
  document.getElementById("spe").innerHTML = 'Vitesse : '+coords.speed;
  document.getElementById("tim").innerHTML = 'TimeStamp : '+coords.timestamp;

  if (!container){
    var niceLat = 43.7101728;
    var niceLon = 7.2619532;

    // MAP LEAFLET
    var map = L.map('mapid').setView([niceLat, niceLon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //L.marker([coords.latitude, coords.longitude]).addTo(map).bindPopup('My position').openPopup();

    // Marqueur Nice
    L.marker([niceLat, niceLon]).addTo(map).bindPopup('Nice').openPopup();

    container = true;
  }
}

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.watchPosition(success, error, options);
