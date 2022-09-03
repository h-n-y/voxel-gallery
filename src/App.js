import './App.css';

import MasterDetailLayout from './layouts/MasterDetailLayout';
// TODO: consider renaming 'GalleryContainer'
import GalleryLayout from './home/GalleryLayout';
import ModelDetailContainer from './home/ModelDetailContainer';
import ModelDetailEmptyState from './home/ModelDetailEmptyState';

const detailUrlPath = ":modelId";

function App() {
  return (
    <MasterDetailLayout 
      master={<GalleryLayout />}
      detail={<ModelDetailContainer />}
      detailEmptyState={<ModelDetailEmptyState />}
      detailUrlPath={detailUrlPath}
    />
  );
}

export default App;
