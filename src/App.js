import MasterDetailLayout from './layouts/MasterDetailLayout';
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
