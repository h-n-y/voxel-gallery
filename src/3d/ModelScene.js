import React from 'react';
import PT from 'prop-types';
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

    // TODO: store temporarily if not needed outside the constructor
    this.camera = ThreeUtil.createOrthographicCamera();
    this.scene = ThreeUtil.createScene();
    this.clock = ThreeUtil.createClock();
    this.renderer = ThreeUtil.createRenderer();
    // TODO: only create if rendering on demand
    this.controls = ThreeUtil.createOrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = props.interactionEnabled;
    this.directionalLight = ThreeUtil.createDirectionalLight();
    this.hemisphereLight = ThreeUtil.createHemisphereLight();
    //this.gltfAsset = null;
    this.gltfModel = null;

    // TODO: remove binding if not necessary
    this.renderScene = this.renderScene.bind(this);
    this.loop = this.loop.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    /*
    this.handleControlsChange = this.handleControlsChange.bind(this);
    this.controls.addEventListener('change', this.handleControlsChange);
    */
  }

  /*
  handleControlsChange() {
    console.log("[controls change]", this.camera.rotation);
  }
  */

  async componentDidMount() {
    this.sceneContainerRef.current.append(this.renderer.domElement);

    //await this.addModelToScene(this.gltfAssetPath);
    /*
    console.log("[ModelScene] Public url:", process.env.PUBLIC_URL)
    await this.addModelToScene(process.env.PUBLIC_URL + "/3d/stiletto-heels-blender.glb");
    */
    this.listenForWindowResize();
    this.updateSceneSize();
    await this.addSceneObjects();
    this.setRenderAnimationLoop();
  }

  async addSceneObjects() {
    //await this.addModelToScene(process.env.PUBLIC_URL + "/3d/stiletto-heels-blender.glb");
    const { assetName } = this.props.model;
    //await this.addModelToScene(process.env.PUBLIC_URL + "/3d/angler.glb");
    await this.addModelToScene(`${process.env.PUBLIC_URL}/3d/${assetName}.glb`);
    this.camera.add(this.directionalLight)
    this.scene.add(this.camera);
    this.scene.add(/*this.directionalLight,*/ this.hemisphereLight);

    /*
    if (this.gltfModel) {
      //this.camera.target.position.copy(this.gltfModel.position);
      console.log("[GEOMETRY]", this.gltfModel.geometry)
      
      // TODO: move somewhere else
      const modelBBCenter = ThreeUtil.getBoundingBoxCenter(this.gltfModel.geometry.boundingBox);
      //this.camera.position = modelBBCenter;
      console.log("BB Center:", modelBBCenter);
      this.camera.position.copy(modelBBCenter);
      this.camera.position.z += 10;
      //this.camera.lookAt(modelBBCenter);
      this.camera.lookAt(modelBBCenter);
      this.camera.updateProjectionMatrix();

      this.camera.position.copy(this.gltfModel.geometry.boundingSphere.center)
      this.camera.position.z = 10
    }
    */
  }

  async componentDidUpdate(prevProps) {
    if (this.props.model !== prevProps.model) {
      // wrap in a method
      //if (this.gltfModel) {
        /*
        this.scene.remove(this.gltfModel);
        //this.gltfModel.removeFromParent();
        this.gltfModel.geometry.dispose();
        this.gltfModel.material.dispose();
        //this.gltfModel = null;
        //*/
        this.setState(prevState => ({
          topBgLayerIsCurrent: !prevState.topBgLayerIsCurrent,
          prevSceneBgColor: prevProps.model.sceneBgColor
        }));

        const { assetName } = this.props.model;
        await this.addModelToScene(`${process.env.PUBLIC_URL}/3d/${assetName}.glb`);

      //}
    }
  }

  componentWillUnmount() {
    this.removeRenderAnimationLoop();
    // TODO: Delete if not needed
    this.controls.removeEventListener('change', this.renderScene);
    window.removeEventListener('resize', this.onWindowResize);

    // TODO: wrap in method
    if (this.gltfModel) {
      this.gltfModel.removeFromParent();
      this.gltfModel.geometry.dispose();
      this.gltfModel.material.dispose();
    }
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

  /*
  handleControlsChange() {
    this.renderScene();
  }
  */

  // TODO: make a hook instead?
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
    // TODO: error handling
    //const model = await ThreeUtil.loadGLTFAsset(assetPath);
    this.gltfModel = await ThreeUtil.loadGLTFAsset(assetPath);

    ThreeUtil.removeAllMeshesFromScene(this.scene);
    this.scene.add(this.gltfModel);
  }

  setRenderAnimationLoop() {
    const shouldRenderContinuously = !this.props.renderOnDemand;
    if (shouldRenderContinuously) {
      this.addRenderAnimationLoop();
    } else {
      //this.renderer.render(this.scene, this.camera);
    }
  }

  addRenderAnimationLoop() {
    // TODO: need to bind this.loop to this?
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
    // TODO: remove clock if not needed
    // Tick every object's animation forward one frame
    const dt = this.clock.getDelta();

    // TODO: update objects with dt
    this.controls.update();
    this.gltfModel.update();
  }
}

ModelScene.defaultProps = {
  interactionEnabled: true
};

ModelScene.propTypes = {
  // TODO: pass in the entire model instead of just the asset path
  // - will need to know additional info like bg gradient

  //gltfAssetPath: PT.string.isRequired,

  // TODO: add model props OR modelAssetName

  interactionEnabled: PT.bool.isRequired,
};

export default ModelScene;
