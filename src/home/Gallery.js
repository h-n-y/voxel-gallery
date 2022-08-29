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

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  componentDidMount() {
    console.log("[Gallery] componentDidMount");
    this._fetchModelData();
  }

  render() {
    const galleryItems = this._getGalleryItems();

    return (
      <div className={styles['gallery']}>

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
    console.log("New category selected: ", selectedCategory);
    this.setState({
      selectedCategory
    });
  }

  _getGalleryItems() {
    const models = this._getModelsForSelectedCategory();
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

  _getModelsForSelectedCategory() {
    const models = this.state.models;
    const selectedCategory = this.state.selectedCategory;

    return models.filter(model => {
      if (selectedCategory === anyCategory) {
        return true;
      }
      return model.category === selectedCategory;
    });
  }

  _fetchModelData() {
    // TODO: fetch voxel model data
    // TODO: place in a try/catch?
    // Or just make a note that error-handling would normally be here
    const result = fetchVoxelModels();

    // Derive category options from the response
    const categories = getDistinctCategories(result.voxelModelData);
    const categoryOptions = [anyCategory].concat(categories); 

    console.log("[Gallery] models:");
    console.log(result);
    console.log(categoryOptions);

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
