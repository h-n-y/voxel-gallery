import React from 'react';
import PT from 'prop-types';
import PropType from '../common/prop-types';
import * as ThreeUtil from '../three-util';
import styles from './ModelScene.module.css';

class ModelScene extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topBgLayerIsCurrent: true,
      prevSceneBgColor: {
        top: "gray",
        bottom: "gray"
      }
    };

    this.sceneContainerRef = React.createRef();

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
    this.sceneContainerRef.current.append(this.renderer.domElement);
    this.listenForWindowResize();
    this.updateSceneSize();
    await this.addSceneObjects();
    this.addRenderAnimationLoop();
  }

  async addSceneObjects() {
    const { assetName } = this.props.model;
    await this.addModelToScene(`${process.env.PUBLIC_URL}/3d/${assetName}.glb`);

    this.scene.add(this.camera, this.hemisphereLight);

    // Make directional light a child of the camera
    this.camera.add(this.directionalLight)
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
    this.removeRenderAnimationLoop();
    window.removeEventListener('resize', this.onWindowResize);
    ThreeUtil.removeAllMeshesFromScene(this.scene);
  }

  // TODO: move
  cssLinearGradientForColor(colors) {
    return `linear-gradient(to bottom,
      ${colors.top},
      ${colors.bottom}
    )`;
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

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  listenForWindowResize() {
    window.addEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    this.updateSceneSize();
  }

  updateSceneSize() {
    const sceneContainerElement = this.sceneContainerRef.current;
    if (!sceneContainerElement) {
      return;
    }

    const { clientWidth, clientHeight } = sceneContainerElement;


    this.camera.top = clientHeight / 2;
    this.camera.bottom = -(clientHeight / 2);
    this.camera.left = -(clientWidth / 2);
    this.camera.right = clientWidth / 2;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  async addModelToScene(assetPath) {
    this.gltfModel = await ThreeUtil.loadGLTFAsset(assetPath);

    ThreeUtil.removeAllMeshesFromScene(this.scene);
    this.scene.add(this.gltfModel);
  }

  addRenderAnimationLoop() {
    this.renderer.setAnimationLoop(this.loop);
  }

  removeRenderAnimationLoop() {
    this.renderer.setAnimationLoop(null);
  }

  loop() {
    this.tick();
    this.renderScene();
  }

  tick() {
    this.controls.update();
    this.gltfModel.update();
  }
}

ModelScene.defaultProps = {
  interactionEnabled: true
};

ModelScene.propTypes = {
  interactionEnabled: PT.bool.isRequired,
  model: PropType.model.isRequired,
};

export default ModelScene;
