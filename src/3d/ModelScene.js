import React from 'react';
import PT from 'prop-types';
import PropType from '../common/prop-types';
import * as ThreeUtil from '../three-util';
import styles from './ModelScene.module.css';

class ModelScene extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // Whether the "top" background scene layer should be displayed or not.
      // If not, then the bottom background scene layer is displayed.
      // The two layers fade in and out to create a smooth gradient transition
      // when switching scene models.
      topBgLayerIsCurrent: true,

      // The background gradient colors of the previously-selected model displayed
      // in the scene.
      prevSceneBgColor: {
        top: "gray",
        bottom: "gray"
      }
    };

    this.sceneContainerRef = React.createRef();

    // three.js objects for rendering
    this.camera = ThreeUtil.createOrthographicCamera();
    this.scene = ThreeUtil.createScene();
    this.renderer = ThreeUtil.createRenderer();
    this.controls = ThreeUtil.createOrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = props.interactionEnabled;
    this.directionalLight = ThreeUtil.createDirectionalLight();
    this.hemisphereLight = ThreeUtil.createHemisphereLight();
    this.gltfModel = null;

    this.loop = this.loop.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  async componentDidMount() {
    // add canvas to the DOM
    this.sceneContainerRef.current.append(this.renderer.domElement);

    // Prepare scene for rendering
    this.listenForWindowResize();
    this.updateSceneSize();
    await this.addSceneObjects();
    this.addRenderAnimationLoop();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.model !== prevProps.model) {
      // Model has changed.

      this.setState(prevState => ({
        topBgLayerIsCurrent: !prevState.topBgLayerIsCurrent,
        prevSceneBgColor: prevProps.model.sceneBgColor
      }));

      const { assetName } = this.props.model;
      await this.addModelToScene(`${process.env.PUBLIC_URL}/3d/${assetName}.glb`);
    }
  }

  componentWillUnmount() {
    // Remove event listeners and tear down scene.
    this.removeRenderAnimationLoop();
    window.removeEventListener('resize', this.onWindowResize);
    ThreeUtil.removeAllMeshesFromScene(this.scene);
  }

  render() {
    const { sceneBgColor } = this.props.model;
    const { prevSceneBgColor, topBgLayerIsCurrent } = this.state;

    const topBgOpacity = topBgLayerIsCurrent ? 1 : 0;
    const topBgGradient = this.cssLinearGradientForColor(
      topBgLayerIsCurrent ? sceneBgColor : prevSceneBgColor
    );
    const bottomBgGradient = this.cssLinearGradientForColor(
      topBgLayerIsCurrent ? prevSceneBgColor : sceneBgColor
    );

    return (
      <div className={styles['scene-container']}>
        <div 
          className={styles['bg-layer-bottom']}
          style={{ background: bottomBgGradient }}
        />
        <div 
          className={styles['bg-layer-top']}
          style={{
            background: topBgGradient,
            opacity: topBgOpacity
          }}
        />
        <div
          ref={this.sceneContainerRef} 
          className={styles['scene']}
        />
      </div>
    );
  }

  /**
   * Renders a single frame of the scene.
   */
  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  listenForWindowResize() {
    window.addEventListener('resize', this.onWindowResize);
  }


  /**
   * Updates the scene camera and canvas when the viewport resizes.
   */
  onWindowResize() {
    this.updateSceneSize();
  }

  /**
   * Adds a camera, lights, and the model to the scene for rendering.
   */
  async addSceneObjects() {
    const { assetName } = this.props.model;
    await this.addModelToScene(`${process.env.PUBLIC_URL}/3d/${assetName}.glb`);

    this.scene.add(this.camera, this.hemisphereLight);

    // Make directional light a child of the camera
    this.camera.add(this.directionalLight)
  }


  /**
   * Updates the scene camera and renderer for the scene container
   * element's dimensions.
   *
   * Typically called when the viewport size changes.
   */
  updateSceneSize() {
    const sceneContainerElement = this.sceneContainerRef.current;
    if (!sceneContainerElement) {
      return;
    }

    const { clientWidth, clientHeight } = sceneContainerElement;

    // Keep camera frustum in sync with scene container size.
    this.camera.top = clientHeight / 2;
    this.camera.bottom = -(clientHeight / 2);
    this.camera.left = -(clientWidth / 2);
    this.camera.right = clientWidth / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  /**
   * Adds a model asset to the scene.
   *
   * @param {string} The path to a model glTF file.
   */
  async addModelToScene(assetPath) {
    this.gltfModel = await ThreeUtil.loadGLTFAsset(assetPath);

    ThreeUtil.removeAllMeshesFromScene(this.scene);
    this.scene.add(this.gltfModel);
  }

  /**
   * Starts the renderer's animation loop.
   */
  addRenderAnimationLoop() {
    this.renderer.setAnimationLoop(this.loop);
  }

  /**
   * Stops the renderer's animation loop.
   */
  removeRenderAnimationLoop() {
    this.renderer.setAnimationLoop(null);
  }

  /**
   * Performs a single iteration of the renderer animation loop.
   */
  loop() {
    this.tick();
    this.renderScene();
  }

  /**
   * Updates the scene control and model state (presumably) for a single
   * loop iteration.
   */
  tick() {
    this.controls.update();
    this.gltfModel.update();
  }

  /**
   * @param colors - An object with top and bottom colors for the scene background gradient.
   * @returns {string} A CSS linear gradient string for `colors`.
   */
  cssLinearGradientForColor(colors) {
    return `linear-gradient(to bottom,
      ${colors.top},
      ${colors.bottom}
    )`;
  }
}

ModelScene.defaultProps = {
  interactionEnabled: true
};

ModelScene.propTypes = {
  // Controls whether user can interact with the 3D model
  interactionEnabled: PT.bool.isRequired,
  // The 3D model data
  model: PropType.model.isRequired,
};

export default ModelScene;
