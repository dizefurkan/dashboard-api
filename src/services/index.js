import _flattenDeep from 'lodash.flattendeep';

import { getFolderNames } from 'utils/fs';


const endpoints = _flattenDeep(getFolderNames(__dirname, ['index.js']).map((filename) => {
  const service = require(`./${filename}`).default; // eslint-disable-line
  return service.getEndpoints();
}));

export default endpoints;
