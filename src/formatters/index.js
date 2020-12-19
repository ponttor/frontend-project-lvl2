import plainFormat from './plain.js';
import stylishFormat from './stylish.js';
import jsonFormat from './json.js';

const getFormat = (data, format) => {
  switch (format) {
    case 'plain':
      return plainFormat(data);
    case 'json':
      return jsonFormat(data);
    case 'stylish':
      return stylishFormat(data);
    default:
      throw new Error(`unknown format: ${format}`);
  }
};

export default getFormat;
