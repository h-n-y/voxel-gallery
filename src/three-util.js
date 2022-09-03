import {
  Scene,
  Mesh,
  FrontSide,
  WebGLRenderer,
  OrthographicCamera,
  DirectionalLight,
  HemisphereLight,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function createScene() {
  const scene = new Scene();
  return scene;
}

export function createRenderer() {
  const renderer = new WebGLRenderer({ 
    antialias: true,
    alpha: true,
  });
  // TODO: experiment with this value
  //renderer.physicallyCorrectLights = true;
  return renderer;
}

export function createOrthographicCamera() {
  const defaultZoom = 160;
  const 
    left = -8,
    right = 8,
    top = 8,
    bottom = -8,
    near = 0.1,
    far = 32;

  const camera = new OrthographicCamera(
    left, right,
    top, bottom,
    near, far
  );
  camera.position.z = 10;
  camera.zoom = defaultZoom;

  return camera;
}

export function createOrbitControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 6.0; // default is 2.0
  controls.maxZoom = 450.0;
  controls.minZoom = 130.0;
  return controls;
}

export function createDirectionalLight() {
  //const lightIntensity = 8;
  //const lightIntensity = 6;
  const lightIntensity = 2;
  const light = new DirectionalLight('white', lightIntensity);
  light.position.set(10, 10, 10); // TODO: remove or explain magic numbers
  return light;
}

export function createHemisphereLight() {
  //const lightIntensity = 5;
  //const lightIntensity = 3;
  const lightIntensity = 1;
  const light = new HemisphereLight(
    'white',
    'darkslategray',
    lightIntensity
  );
  return light;
}

export function removeAllMeshesFromScene(scene) {
  for (const obj of scene.children) {
    if (obj instanceof Mesh) {
      scene.remove(obj);
      obj.geometry.dispose();
      obj.material.dispose();
    }
  }
}

export async function loadGLTFAsset(assetPath) {
  const loader = new GLTFLoader();
  const asset = await loader.loadAsync(assetPath);

  const model = asset.scene.children[0];
  model.material.transparent = true;

  // Prevents both sides of the material from being rendered
  // when it's semi-transparent.
  model.material.side = FrontSide; 

  model.material.opacity = 0;
  model.update = () => {
    if (model.material.opacity < 1) {
      model.material.opacity = Math.min( 1, model.material.opacity + 0.05 );
    }
  };

  return model;
}
