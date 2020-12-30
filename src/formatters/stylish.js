import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  const internal = (tree, deep) => {
    const str = indent(deep);
    if (!_.isObject(tree)) {
      return tree;
    }
    const keys = _.keys(tree);
    const result = keys.map((key) => {
      const content = tree[key];
      return `${str}  ${key}: ${internal(content, deep + 1)}`;
    }).join('\n');
    return `{\n${result}\n${indent(deep - 1)}  }`;
  };
  return internal(value, depth + 1);
};

const stylishFormat = (data) => {
  const iter = (object, depth) => {
    const convertedData = object.map((segment) => {
      const {
        type, key, value, value1, value2, children,
      } = segment;

      const stringValue = stringify(value, depth);
      const stringValue1 = stringify(value1, depth);
      const stringValue2 = stringify(value2, depth);

      const str = indent(depth);

      switch (type) {
        case 'deleted':
          return `${str}- ${key}: ${stringValue}`;
        case 'added':
          return `${str}+ ${key}: ${stringValue}`;
        case 'nested':
          return `${str}  ${key}: {\n${iter(children, depth + 1)}\n${str}  }`;
        case 'updated':
          return `${str}- ${key}: ${stringValue1}\n${str}+ ${key}: ${stringValue2}`;
        case 'unchanged':
          return `${str}  ${key}: ${stringValue}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });
    return convertedData.join('\n');
  };
  return `{\n${iter(data, 1)}\n}`;
};

export default stylishFormat;
