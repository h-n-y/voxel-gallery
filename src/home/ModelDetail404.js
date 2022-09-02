import PT from 'prop-types';
import DismissButton from '../common/DismissButton';
import styles from './ModelDetail404.module.css';

function ModelDetail404({ modelId }) {
  return (
    <section className={styles['model-detail-404']}>
      <h1> 404 </h1>
      <p>
        Model with id "{modelId}" does not exist. 
      </p>   

      <div className={styles['dismiss-btn-box']}>
        <DismissButton />
      </div>
    </section>
  );
}

export default ModelDetail404;
