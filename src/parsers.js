import yaml from 'js-yaml';

const render = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default render;
