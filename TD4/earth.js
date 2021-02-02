"use strict";

var camera, scene, renderer, stats;
var cameraControls, effectController;
var clock = new THREE.Clock();

var light;
var material, texture, materialText;
var geometry, marker;

navigator.geolocation.watchPosition(success, error, options);

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  var pos = _convertLatLonToVec3(crd.latitude, crd.longitude)

  marker.position.x = pos.x;
  marker.position.y = pos.y;
  marker.position.z = pos.z;
}

function _convertLatLonToVec3 (lat,lon) {
  lat =  lat * Math.PI / 180.0;
  lon = -lon * Math.PI / 180.0;
  return new THREE.Vector3(
    10 * Math.cos(lat) * Math.cos(lon), //rechts links invert
    10 * Math.sin(lat),  // up down invert
    10 * Math.cos(lat) * Math.sin(lon));
  }

  function error(err) {
    console.warn('ERREUR ('+err.code+'): '+err.message);
  }

  function fillScene() {
    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xAAAAAA, 2000, 4000);

    // LIGHTS
    scene.add(new THREE.AmbientLight(0x222222));
    light = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    light.position.set(1, 1, 0);
    scene.add(light);

    // MATERIAL & TEXTURE
    material = new THREE.MeshPhongMaterial({color: 0xFF0000});
    texture = new THREE.TextureLoader().load('textures/Color_Map.jpg');
    materialText = new THREE.MeshBasicMaterial({map: texture});

    // GEOMETRIES
    geometry = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), materialText);
    geometry.position.set(0, 0, 0);
    scene.add(geometry);
    marker = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
    scene.add(marker);
  }

  function init() {
    // CANVAS
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor( 0x000000, 1.0 );

    // CAMERA
    camera = new THREE.PerspectiveCamera( 35, canvasWidth/ canvasHeight, 1, 4000 );
    camera.position.set( -50, 0, -50 );

    // CONTROLS
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0,0,0);
  }

  function drawHelpers() {
    //Coordinates.drawGround({size:10000});
    //Coordinates.drawGrid({size:10000,scale:0.01});
  }

  function addToDOM() {
    var container = document.getElementById('webGL');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
      container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();
  }

  function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
  }

  function setupGui() {
  }

  try {
    init();
    fillScene();
    setupGui();
    drawHelpers();
    addToDOM();
    animate();
  } catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
  }
