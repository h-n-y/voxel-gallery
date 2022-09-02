import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVoxelModelWithId } from '../api/api-utils';
import ModelDetail from './ModelDetail';
import ModelDetail404 from './ModelDetail404';

const cssClassNoScroll = 'no-scroll-mobile';

function ModelDetailContainer() {
  let modelId = useParams().modelId;
  let model = fetchVoxelModelWithId(modelId);

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
