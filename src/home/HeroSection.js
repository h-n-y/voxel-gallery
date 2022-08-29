import styles from './HeroSection.module.css';

function HeroSection() {
  const magicavoxelUrl = "https://ephtracy.github.io/"
  const magicavoxelLink = <a href={magicavoxelUrl} target="_blank">MagicaVoxel</a>

  return (
    <div className={styles["hero-section"]}>
      <div className={styles["threejs-container"]}>
        {/* threejs canvas is inserted here */} 
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
