import PT from 'prop-types';

/**
 * Represents data for a single 3D model.
 */
const model = PT.exact({
  id: PT.string,
  name: PT.string,
  assetName: PT.string,
  category: PT.string,
  sceneBgColor: PT.exact({
    top: PT.string,
    bottom: PT.string
  })
});

const PropTypes = {
  model,
};

export default PropTypes;
