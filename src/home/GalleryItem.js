import PropType from '../common/prop-types';
import { useParams } from 'react-router-dom';
import styles from './GalleryItem.module.css';
import ModelImage from './ModelImage';

function GalleryItem({ model }) {
  const currentModelId = useParams().modelId;
  const className = styles['gallery-item'] + 
  (
    model.id === currentModelId ?
    ' ' + styles['is-selected'] :
    ''
  );

  return (
    <div className={className}>
      <ModelImage assetName={model.assetName} />
    </div>
  );
}

GalleryItem.propTypes = {
  model: PropType.model.isRequired,
};

export default GalleryItem;
