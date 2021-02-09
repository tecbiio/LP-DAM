"use strict";

var camera, scene, renderer, stats;
var cameraControls, effectController;
var clock = new THREE.Clock();

var light;
var compassMat, needleMat;
var compass, needle;
var x;

function fillScene() {
  // SCENE
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xAAAAAA, 2000, 4000);

  // LIGHTS
  scene.add(new THREE.AmbientLight(0x222222));
  light = new THREE.DirectionalLight(0xFFFFFF, 1.5);
  light.position.set(1, 1, 0);
  scene.add(light);

  // MATERIAL
  compassMat = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  needleMat = new THREE.MeshBasicMaterial( {color: 0xff00ff} );

  // GEOMETRY
  needle = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 18, 32), needleMat);
  needle.position.y = 0.5;
  needle.rotation.x = 11;
  compass = new THREE.Mesh(new THREE.CylinderGeometry(10, 10, 1, 32), compassMat);
  scene.add(compass);
  scene.add(needle);
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
  needle.rotation.z = x*(Math.PI/30);
  window.requestAnimationFrame(animate);
  render();
}

function deviceOrientationHandler(evt) {
  x = evt.alpha;
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

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
}
