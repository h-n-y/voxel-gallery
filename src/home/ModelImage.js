import PT from 'prop-types';
import styles from './ModelImage.module.css';

/**
 * A model thumbnail view.
 */
function ModelImage({ assetName }) {
  return (
    <picture className={styles['model-image']}>
      <source 
        media="(max-width: 899px)"
        srcSet= {
          `${imagePath(assetName)} 1x,
           ${imagePath2x(assetName)} 2x` 
        }
      />

      <img 
        src={`${smallImagePath(assetName)}`}
        srcSet={
          `${smallImagePath(assetName)} 1x,
           ${smallImagePath2x(assetName)} 2x`
        }
        alt={`Thumbnail for model "${assetName}"`} />
    </picture>
  );
}

ModelImage.propTypes = {
  assetName: PT.string.isRequired,
};


/*
 * Helper functions
 */

function imagePath(assetName) {
  return require(`../assets/img/models/${assetName}.png`);
}

function imagePath2x(assetName) {
  return require(`../assets/img/models/${assetName}@2x.png`);
}

function smallImagePath(assetName) {
  return require(`../assets/img/models/${assetName}-small.png`);
}

function smallImagePath2x(assetName) {
  return require(`../assets/img/models/${assetName}-small@2x.png`);
}


export default ModelImage;
