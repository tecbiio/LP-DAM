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
    var bermudesLat = 32.3191775;
    var bermudesLon = -64.7670827;
    var marseilleLat = 43.296482;
    var marseilleLon = 5.36978;
    // Rayon de la Terre
    var R = 6371000;

    // MAP STAMEN
    // replace "toner" here with "terrain" or "watercolor"
    var layer = new L.StamenTileLayer("toner");
    var map = new L.Map("mapid", {
      center: new L.LatLng(bermudesLat, bermudesLon),
      zoom: 12
    });
    map.addLayer(layer);

    // Triangle bermudes
    L.polygon([
      [25.789106, -80.226529],
      [18.4663188, -66.1057427],
      [32.294887, -64.781380]
    ], {
      color: 'red'
    }).addTo(map);

    // Cercle myPosition
    L.circle([coords.latitude, coords.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: coords.accuracy
    }).addTo(map);

    // Distance de myPosition à Marseille
    var dist = 2*R*Math.asin(Math.sqrt(Math.pow(Math.sin(((coords.latitude-marseilleLat)/2)*Math.PI/180), 2)+Math.cos(marseilleLat*(Math.PI/180))*Math.cos(coords.latitude*(Math.PI/180))*Math.pow(Math.sin(((coords.longitude-marseilleLon)/2)*(Math.PI/180)), 2)));
    document.getElementById("distance").innerHTML = 'Distance de ma position à Marseille : '+dist;
    
    container = true;
  }
}

function error(err) {
  console.warn('ERREUR ('+err.code+'): '+err.message);
}

navigator.geolocation.watchPosition(success, error, options);
