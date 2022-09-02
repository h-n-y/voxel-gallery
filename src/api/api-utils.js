import voxelModelData, { heroModel } from '../data/models';

export function fetchVoxelModels() {
  const response = {
    statusCode: 200,
    voxelModelData,
  };

  return response;
}

export function fetchVoxelModelWithId(modelId) {
  return voxelModelData.find(model => model.id === modelId);
}

export function fetchHeroModel() {
  return heroModel;
}
