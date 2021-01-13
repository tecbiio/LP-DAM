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
    var bermudesLat = 32.3191775;
    var bermudesLon = -64.7670827;

    // MAP LEAFLET
    var mapLeaflet = L.map('mapid').setView([niceLat, niceLon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapLeaflet);

    //L.marker([coords.latitude, coords.longitude]).addTo(map).bindPopup('My position').openPopup();

    // Marqueur Nice
    L.marker([niceLat, niceLon]).addTo(mapLeaflet).bindPopup('Nice').openPopup();

    // Marqueur Bermudes
    //L.marker([bermudesLat, bermudesLon]).addTo(mapLeaflet);
    L.polygon([
      [25.789106, -80.226529],
      [18.4663188, -66.1057427],
      [32.294887, -64.781380]
    ], {
      color: 'red'
    }).addTo(mapLeaflet);

    // MAP STAMEN
    // replace "toner" here with "terrain" or "watercolor"
    var layer = new L.StamenTileLayer("toner");
    var mapStamen = new L.Map("map2id", {
        center: new L.LatLng(bermudesLat, bermudesLon),
        zoom: 12
    });
    mapStamen.addLayer(layer);

    // Marqueur Bermudes
    //var marker = L.marker([bermudesLat, bermudesLon]).addTo(mapStamen);

    container = true;
  }
}

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.watchPosition(success, error, options);
