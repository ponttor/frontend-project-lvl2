import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const format = (data, type) => {
  switch (type) {
    case 'plain':
      return formatPlain(data);
    case 'json':
      return formatJson(data);
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`unknown format: ${format}`);
  }
};

export default format;
