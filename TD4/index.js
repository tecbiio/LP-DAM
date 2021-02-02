"use strict";

var camera, scene, renderer, stats;
var cameraControls, effectController;
var clock = new THREE.Clock();

var light;
var texture, materialText;
var geometry, loader;

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler);
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

  // TEXTURE
  texture = new THREE.TextureLoader().load('textures/black-texture.jpg');
  materialText = new THREE.MeshBasicMaterial({map: texture});

  // GEOMETRY
  geometry = new THREE.Mesh(new THREE.DodecahedronGeometry(5, 1), materialText);
  geometry.position.set(-5, 1, 0);
  scene.add(geometry);

  // OBJECT LOADER
  loader = new THREE.GLTFLoader();
  loader.load(
  'models/Monster.gltf',
  function ( gltf ) {
    scene.add( gltf.scene );
  },
  function ( xhr ) {
    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
  },
  function ( error ) {
    console.log( 'An error happened' );
  }
);
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

function deviceMotionHandler(event){
  geometry.rotation.x = event.rotationRate.beta;
  geometry.rotation.y = event.rotationRate.gamma;
  geometry.rotation.z = event.rotationRate.alpha;
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
