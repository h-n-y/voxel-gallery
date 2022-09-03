import React from 'react';
import { Link } from 'react-router-dom';
import { fetchVoxelModels } from '../api/api-utils';
import SelectControl from '../common/SelectControl';
import GalleryItem from './GalleryItem';
import styles from './Gallery.module.css';

const anyCategory = 'All';

class Gallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryOptions: [],
      selectedCategory: anyCategory,
      models: []
    };

    this.galleryRef = React.createRef();

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount() {
    this.fetchModelData();
  }

  render() {
    const galleryItems = this.getGalleryItems();

    return (
      <div 
        ref={this.galleryRef}
        className={styles['gallery']}>

        <div className={styles['select-control-box']}>
          <SelectControl
            id="category-select"
            label="Category"
            options={this.state.categoryOptions}
            selectedOption={this.state.selectedCategory}
            onSelect={this.handleSelectCategory} />
        </div>

        <nav>
          <ul className={styles['gallery-list']}>
            {galleryItems}
          </ul>
        </nav>
      </div>
    );
  }

  handleSelectCategory(selectedCategory) {
    this.setState({
      selectedCategory
    });
    this.scrollToGalleryTop();
  }

  scrollToGalleryTop() {
    const minRegularLayoutWidth = 900;
    if (window.innerWidth < minRegularLayoutWidth) {
      this.scrollToGalleryTopForCompactLayout();
    } else {
      this.scrollToGalleryTopForRegularLayout();
    }
  }

  scrollToGalleryTopForCompactLayout() {
    if (window.scrollY > window.innerHeight) {
      window.scrollTo(0, window.innerHeight);
    }
  }

  scrollToGalleryTopForRegularLayout() {
    const galleryNode = this.galleryRef.current;
    if (galleryNode) {
      galleryNode.scrollTop = 0;
    }
  }

    return (
      models.map(model => 
        <li key={model.name} >
          <Link to={`/${model.id}`}>
            <GalleryItem model={model} />
          </Link>
        </li>
      )
    );
  }

    const models = this.state.models;
    const selectedCategory = this.state.selectedCategory;

    return models.filter(model => {
      if (selectedCategory === anyCategory) {
        return true;
      }
      return model.category === selectedCategory;
    });
  }

    const result = fetchVoxelModels();

    // Derive category options from the response
    const categories = getDistinctCategories(result.voxelModelData);
    const categoryOptions = [anyCategory].concat(categories); 

    this.setState({
      models: result.voxelModelData,
      categoryOptions,
    });
  }
}

function getDistinctCategories(modelData) {
  const distinctCategories = new Set(modelData.map(datum => datum.category));
  return Array.from(distinctCategories).sort();
}

export default Gallery;
