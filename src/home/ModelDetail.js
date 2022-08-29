import PT from 'prop-types';
import { useParams } from 'react-router-dom';
import styles from './ModelDetail.module.css';

function ModelDetail(props) {
  return (
    <div className={styles['model-detail']}>
    
    <h3>
      model detail for "{props.model.name}"
      </h3>
    </div>
  );
}

ModelDetail.propTypes = {
  // model
};

export default ModelDetail;
