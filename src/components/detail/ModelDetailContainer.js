import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVoxelModelWithId } from '../../api/api-utils';
import ModelDetail from './ModelDetail';
import ModelDetail404 from './ModelDetail404';

const cssClassNoScroll = 'no-scroll-mobile';

/**
 * Displays an interactive 3D model or a 404 page if the model
 * could not be found.
 */
function ModelDetailContainer() {
  let modelId = useParams().modelId;
  let model = fetchVoxelModelWithId(modelId);

  // Disables page-wide scrolling so long as this component is
  // mounted. Prevents inadvertent scrolling of bottom layer
  // when this view is displayed modally on mobile layouts.
  useEffect(() => {
    document.body.classList.add(cssClassNoScroll);
    return () => {
      document.body.classList.remove(cssClassNoScroll);
    };
  }, []);

  return model ?
    <ModelDetail model={model} /> :
    <ModelDetail404 modelId={modelId} />;
}

export default ModelDetailContainer;
