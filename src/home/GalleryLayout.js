import Gallery from './Gallery';
import HeroSection from './HeroSection';
import styles from './GalleryLayout.module.css';

function GalleryLayout() {
  return (
    <div className={styles['gallery-layout']}>
      <div className={styles['compact-hero-section-box']}>
        <HeroSection /> 
      </div> 

      <Gallery />
    </div>
  );
}

export default GalleryLayout;
