import styles from './ModelDetailEmptyState.module.css';

function ModelDetailEmptyState() {
  return (
    <section className={styles['model-detail-empty-state']}>
      <h1>
      Voxel Model Gallery
      </h1>
    <p>
    Welcome to my gallery of simple models I created with <a href="https://ephtracy.github.io/" target="_blank">MagicaVoxel</a>.
    </p>
    <p>
    Click or tap a model on the left to see it rendered in 3D!
    </p>
    </section>
  );
}

export default ModelDetailEmptyState;
