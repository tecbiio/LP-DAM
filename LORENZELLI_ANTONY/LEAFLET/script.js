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

  if (!container){

    // MAP LEAFLET
    var map = L.map('mapid').setView([coords.latitude, coords.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Cercle myPosition
    L.circle([coords.latitude, coords.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: coords.accuracy
    }).addTo(map);

    L.marker([coords.latitude, coords.longitude]).addTo(map).bindPopup('My Position').openPopup();

    map.addControl( new L.Control.Compass({autoActive: true, showDigit: true}) );

    container = true;
    window.requestAnimationFrame(success);
  }
}

window.requestAnimationFrame(success);

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.watchPosition(success, error, options);
