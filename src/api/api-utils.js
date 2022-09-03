import voxelModelData, { heroModel } from '../data/models';

/**
 * Fetches the voxel model data.
 * @returns All the voxel model data.
 */
export function fetchVoxelModels() {
  const response = {
    // Since data is fetched locally, hardcode a 200 success status code.
    statusCode: 200,
    voxelModelData,
  };

  return response;
}

/**
 * @param {string} modelId - The unique id of the model to fetch.
 * @returns The model for the given id or `undefined` if not found.
 */
export function fetchVoxelModelWithId(modelId) {
  return voxelModelData.find(model => model.id === modelId);
}

/**
 * @returns The model for display in the hero section of the page.
 */
export function fetchHeroModel() {
  return heroModel;
}
