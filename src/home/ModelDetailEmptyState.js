import HeroSection from './HeroSection';

import styles from './ModelDetailEmptyState.module.css';

function ModelDetailEmptyState() {
  const heroSectionCTA = 'Click or tap a model on the left to see it rendered in 3D!';

  return (
    <section className={styles['model-detail-empty-state']}>
      <HeroSection cta={heroSectionCTA} />
    </section>
  );
}

export default ModelDetailEmptyState;
