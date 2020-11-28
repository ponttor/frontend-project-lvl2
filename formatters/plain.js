/* eslint-disable no-console */
import _ from 'lodash';

const stringify = (value) => {
  if (value === true || value === false || value === null) {
    return value;
  }
  if (!_.isObject(value)) {
    return `'${value}'`;
  }
  return '[complex value]';
};

const added = (acc, key, value) => {
  if (acc === '') {
    return `Property '${key}' was added with value: ${stringify(value)}`;
  }
  return `Property '${acc}.${key}' was added with value: ${stringify(value)}`;
};
const updated = (key, acc, value1, value2) => `Property '${acc}.${key}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
const deleted = (key, acc) => {
  if (acc === '') {
    return `Property '${key}' was removed`;
  }
  return `Property '${acc}.${key}' was removed`;
};

const plainFormat = (data) => {
  const convertedData = data.map((segment) => {
    const {
      action, key, value1, value2, children, acc,
    } = segment;
    if (action === 'deleted') {
      return deleted(key, acc.substr(1));
    }
    if (action === 'added') {
      return added(acc.substr(1), key, value2);
    }
    if (action === 'objects') {
      return `${plainFormat(children)}`;
    }
    if (action === 'updated') {
      return updated(key, acc.substr(1), value1, value2);
    }
    if (action === 'same') {
      return null;
    }
    return console.log(`Unknown action: ${action}`);
  });
  return convertedData.filter((element) => element !== null).join('\n');
};

export default plainFormat;
