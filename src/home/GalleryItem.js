import PT from 'prop-types';
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
    {/*
      <h2> {model.name} </h2> 
      <label> {model.category} </label>
      */}
      <ModelImage assetName={model.assetName} />
    </div>
  );
}

GalleryItem.propTypes = {
  // TODO: DRY this up if repeated elsewhere.
  model: PT.exact({
    name: PT.string,
    category: PT.string,
    description: PT.string,
    assetUrl: PT.strin,
  }),
};

export default GalleryItem;
