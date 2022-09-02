import PT from 'prop-types';
import { fetchHeroModel } from '../api/api-utils';
import ModelScene from '../3d/ModelScene';
import styles from './HeroSection.module.css';

function HeroSection() {
  const magicavoxelUrl = "https://ephtracy.github.io/"
  const magicavoxelLink = <a href={magicavoxelUrl} target="_blank">MagicaVoxel</a>
  const heroModel = fetchHeroModel();

  return (
    <div className={styles["hero-section"]}>
      <div className={styles["threejs-container"]}>
        {/* threejs canvas is inserted here */} 
        <ModelScene
          interactionEnabled={false}
          model={heroModel} />
      </div>

      <section className={styles["hero-copy"]}>
          <h1> Voxel Model Gallery </h1>
          <p>
            Welcome to my gallery of models I created with {magicavoxelLink}.
          </p>
          <p>
            Scroll down to see them all.
          </p>
        {/*
          <p>
          Click or tap a model to see it displayed in 3D.
          </p>
          */}
      </section>
    </div>
  );
}

export default HeroSection;
