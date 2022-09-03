import React from 'react';
import { Link } from 'react-router-dom';
import { fetchVoxelModels } from '../../api/api-utils';
import SelectControl from '../common/SelectControl';
import GalleryItem from './GalleryItem';
import styles from './Gallery.module.css';

// The select control option when displaying *all* models.
const anyCategory = 'All';

/**
 * Displays a filterable list of model thumbnails for users to choose from.
 */
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

        {/* SELECT CONTROL */}
        <div className={styles['select-control-box']}>
          <SelectControl
            id="category-select"
            label="Category"
            options={this.state.categoryOptions}
            selectedOption={this.state.selectedCategory}
            onSelect={this.handleSelectCategory} />
        </div>

       {/* GALLERY LIST */}
        <nav>
          <ul className={styles['gallery-list']}>
            {galleryItems}
          </ul>
        </nav>
      </div>
    );
  }

  /**
   * Updates the selected model category.
   *
   * @param {string} selectedCategory - The model category selected by the user.
   */
  handleSelectCategory(selectedCategory) {
    this.setState({
      selectedCategory
    });
    this.scrollToGalleryTop();
  }

  /**
   * Scrolls the gallery to the top of the list.
   */
  scrollToGalleryTop() {
    const minRegularLayoutWidth = 900;
    if (window.innerWidth < minRegularLayoutWidth) {
      this.scrollToGalleryTopForCompactLayout();
    } else {
      this.scrollToGalleryTopForRegularLayout();
    }
  }

  /**
   * Scrolls the gallery to the top of the list.
   *
   * Meant for horizontally compact layouts only.
   */
  scrollToGalleryTopForCompactLayout() {
    if (window.scrollY > window.innerHeight) {
      window.scrollTo(0, window.innerHeight);
    }
  }

  /**
   * Scrolls the gallery to the top of the list.
   *
   * Meant for horizontally regular (i.e. desktop-sized) layouts only.
   */
  scrollToGalleryTopForRegularLayout() {
    const galleryNode = this.galleryRef.current;
    if (galleryNode) {
      galleryNode.scrollTop = 0;
    }
  }

  /**
   * @returns An array of gallery item elements for the current model category.
   */
  getGalleryItems() {
    const models = this.getModelsForSelectedCategory();
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

  /**
   * @returns An array of models for the current model category.
   */
  getModelsForSelectedCategory() {
    const models = this.state.models;
    const selectedCategory = this.state.selectedCategory;

    return models.filter(model => {
      if (selectedCategory === anyCategory) {
        return true;
      }
      return model.category === selectedCategory;
    });
  }

  /**
   * Fetches the voxel model data and sets the category options
   * from the result.
   */
  fetchModelData() {
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

/**
 * @param modelData - An array of model data.
 * @returns An array of the distinct model categories found in `modelData`.
 */
function getDistinctCategories(modelData) {
  const distinctCategories = new Set(modelData.map(datum => datum.category));
  return Array.from(distinctCategories).sort();
}

export default Gallery;
