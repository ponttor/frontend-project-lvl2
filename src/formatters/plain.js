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

const plainFormat = (data, acc = []) => {
  const convertedData = data.map((segment) => {
    const {
      action, key, value1, value2, children,
    } = segment;
    const newAcc = [...acc, key];
    if (action === 'deleted') {
      return `Property '${newAcc.join('.')}' was removed`;
    }
    if (action === 'added') {
      return `Property '${newAcc.join('.')}' was added with value: ${stringify(value2)}`;
    }
    if (action === 'objects') {
      return plainFormat(children, newAcc);
    }
    if (action === 'updated') {
      return `Property '${newAcc.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
    }
    if (action === 'same') {
      return null;
    }
    throw new Error(`Unknown action: ${action}`);
  });
  return convertedData.filter((element) => element !== null).join('\n');
};

export default plainFormat;
