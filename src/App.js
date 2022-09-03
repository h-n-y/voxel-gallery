import MasterDetailLayout from './components/layouts/MasterDetailLayout';
import GalleryLayout from './components/master/GalleryLayout';
import ModelDetailContainer from './components/detail/ModelDetailContainer';
import ModelDetailEmptyState from './components/detail/ModelDetailEmptyState';

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
