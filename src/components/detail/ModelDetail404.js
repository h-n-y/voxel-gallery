import PT from 'prop-types';
import DismissButton from '../common/DismissButton';
import styles from './ModelDetail404.module.css';

/**
 * A "no content" view to display in place of <ModelDetail>
 * when no model exists for `modelId`.
 */
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

ModelDetail404.propTypes = {
  // The id of the missing model.
  modelId: PT.string.isRequired,
};

export default ModelDetail404;
