import PT from 'prop-types';
import { fetchHeroModel } from '../api/api-utils';
import ModelScene from '../3d/ModelScene';
import styles from './HeroSection.module.css';

const defaultCTA = 'Scroll down to see them all.';

function HeroSection({ cta }) {
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
            Welcome to my gallery of interactive models I created with {magicavoxelLink}.
          </p>
          <p>
            {cta}
          </p>
      </section>
    </div>
  );
}

HeroSection.defaultProps = {
  cta: defaultCTA,
};

HeroSection.propTypes = {
  cta: PT.string.isRequired
};

export default HeroSection;
