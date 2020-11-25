/* eslint-disable import/extensions */
import plainFormat from './plain.js';
import stylishFormat from './stylish.js';

const getFormat = (data, format) => {
  if (format === 'plain') {
    return plainFormat(data);
  }
  return stylishFormat(data);
};

export default getFormat;
