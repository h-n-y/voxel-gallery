import PropType from '../../data/prop-types';
import ModelScene from './ModelScene';
import DismissButton from '../common/DismissButton';
import styles from './ModelDetail.module.css';

/**
 * Displays an interactive 3D model and descriptive text.
 */
function ModelDetail(props) {
  return (
    <div className={styles['model-detail']}>

      <ModelScene model={props.model} />

      <section className={styles['model-detail-copy']}>
        <h2>
          {props.model.name}
        </h2>
        <h3>
          {props.model.category} 
        </h3>
      </section> 

      <div className={styles['dismiss-button-box']}>
        <DismissButton />
      </div>
    </div>
  );
}

ModelDetail.propTypes = {
  model: PropType.model.isRequired,
};

export default ModelDetail;
