import PT from 'prop-types';
import { useParams } from 'react-router-dom';
import ModelScene from '../3d/ModelScene';
import styles from './ModelDetail.module.css';

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
    </div>
  );
}

ModelDetail.propTypes = {
  // model
};

export default ModelDetail;
