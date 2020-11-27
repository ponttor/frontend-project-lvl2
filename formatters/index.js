/* eslint-disable import/extensions */

import plainFormat from './plain.js';
import stylishFormat from './stylish.js';
import jsonFormat from './json.js';

const getFormat = (data, format) => {
  if (format === 'plain') {
    return plainFormat(data);
  }
  if (format === 'json') {
    return jsonFormat(data);
  }
  return stylishFormat(data);
};

export default getFormat;
