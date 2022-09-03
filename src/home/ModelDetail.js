import PT from 'prop-types';
import ModelScene from '../3d/ModelScene';
import DismissButton from '../common/DismissButton';
import styles from './ModelDetail.module.css';

function ModelDetail(props) {
  return (
    <div className={styles['model-detail']}>

      <ModelScene model={props.model} />

    {/* TODO: extract into a <ModelDescription /> component */}
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
  // model
};

export default ModelDetail;
