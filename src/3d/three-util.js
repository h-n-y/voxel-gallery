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

/**
 * @returns A three.js `Scene`.
 */
export function createScene() {
  const scene = new Scene();
  return scene;
}

/**
 * @returns A three.js `WebGLRenderer`.
 */
export function createRenderer() {
  const renderer = new WebGLRenderer({ 
    antialias: true,
    alpha: true,
  });

  // TODO: experiment with this value
  //renderer.physicallyCorrectLights = true;

  return renderer;
}


/**
 * @returns A three.js `OrthographicCamera`.
 */
export function createOrthographicCamera() {
  // Sensible defaults for the camera zoom and frustum.
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

/**
 * @param camera - A three.js camera
 * @param canvas - An HTML canvas for rendering a 3D scene.
 * @returns A three.js `OrbitControls` for manipulating `camera`'s position.
 */
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

/**
 * @returns A three.js `DirectionalLight`;
 */
export function createDirectionalLight() {
  //const lightIntensity = 8;
  //const lightIntensity = 6;
  const lightIntensity = 2;
  const light = new DirectionalLight('white', lightIntensity);
  const lightXYZ = [10, 10, 10]
  light.position.set(...lightXYZ);
  return light;
}

/**
 * @returns A three.js `HemisphereLight`.
 */
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

/**
 * Removes all child meshes from a scene and disposes of
 * the mesh's geometry and material data.
 *
 * @param {Scene} scene - A three.js scene object.
 */
export function removeAllMeshesFromScene(scene) {
  for (const obj of scene.children) {
    if (obj instanceof Mesh) {
      scene.remove(obj);
      obj.geometry.dispose();
      obj.material.dispose();
    }
  }
}

/**
 * Loads a glTF asset stored in a .gltf or .glb file.
 *
 * @param {string} assetPath - The directory location of a gltf or glb file.
 * @returns The asset contained in `assetPath`. (Typically a `Mesh` object.)
 */
export async function loadGLTFAsset(assetPath) {
  const loader = new GLTFLoader();
  const asset = await loader.loadAsync(assetPath);

  const model = asset.scene.children[0];
  model.material.transparent = true;

  // Prevents both sides of the material from being rendered
  // when it's semi-transparent.
  model.material.side = FrontSide; 

  model.material.opacity = 0;

  // Add an 'update' function to the model to call on every render loop iteration.
  // This function fades the model into view as soon as it's added to the scene.
  model.update = () => {
    if (model.material.opacity < 1) {
      model.material.opacity = Math.min( 1, model.material.opacity + 0.05 );
    }
  };

  return model;
}
