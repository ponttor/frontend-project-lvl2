/* eslint-disable no-console */
import yaml from 'js-yaml';

const render = (data, format) => {
  if (format === 'json') {
    const getRender = JSON.parse;
    return getRender(data);
  }
  if (format === 'yml') {
    const getRender = yaml.safeLoad;
    return getRender(data);
  }
  throw new Error(`Unknown format: ${format}`);
};

export default render;
