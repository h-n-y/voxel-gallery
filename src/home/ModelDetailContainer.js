import { useParams } from 'react-router-dom';
import { fetchVoxelModelWithId } from '../api/api-utils';
import ModelDetail from './ModelDetail';
import ModelDetail404 from './ModelDetail404';

function ModelDetailContainer() {
  let modelId = useParams().modelId;
  let model = fetchVoxelModelWithId(modelId);

  return model ?
    <ModelDetail model={model} /> :
    <ModelDetail404 modelId={modelId} />;
}

export default ModelDetailContainer;
