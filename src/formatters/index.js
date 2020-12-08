import plainFormat from './plain.js';
import stylishFormat from './stylish.js';
import jsonFormat from './json.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(data);
    case 'json':
      return jsonFormat(data);
    default:
      return stylishFormat(data);
  }
};

export default getFormat;
