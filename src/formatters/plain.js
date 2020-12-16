import _ from 'lodash';

const stringify = (value) => {
  if (_.isBoolean(value) || _.isNull(value)) {
    return value;
  }
  if (!_.isObject(value)) {
    return `'${value}'`;
  }
  return '[complex value]';
};
const plainFormat = (data) => {
  const format = (object, acc) => {
    const convertedData = object.map((segment) => {
      const {
        action, key, value, value1, value2, children,
      } = segment;
      const newAcc = [...acc, key];

      switch (action) {
        case 'deleted':
          return `Property '${newAcc.join('.')}' was removed`;
        case 'added':
          return `Property '${newAcc.join('.')}' was added with value: ${stringify(value)}`;
        case 'nested':
          return format(children, newAcc);
        case 'updated':
          return `Property '${newAcc.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    });
    return convertedData.filter((element) => element !== null).join('\n');
  };
  return format(data, []);
};
export default plainFormat;
