import _ from 'lodash';

const indentBracket = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount + 2);
const indentKey = (depth) => ' '.repeat(8 + 4 * depth);

const stringify = (value, depth) => {
  const internal = (tree, deep) => {
    const str = indentBracket(deep);
    const strKey = indentKey(deep);
    if (!_.isObject(tree)) {
      return tree;
    }
    const keys = _.keys(tree);
    const result = keys.map((key) => {
      const content = tree[key];
      return `${strKey}${key}: ${internal(content, deep + 1)}`;
    }).join('\n');
    return `{\n${result}\n${str}  }`;
  };
  return internal(value, depth);
};

const stylishFormat = (data) => {
  const iter = (object, depth) => {
    const convertedData = object.map((segment) => {
      const {
        action, key, value, value1, value2, children,
      } = segment;

      const stringValue = stringify(value, depth);
      const stringValue1 = stringify(value1, depth);
      const stringValue2 = stringify(value2, depth);

      const str = indentBracket(depth);

      switch (action) {
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
          throw new Error(`Unknown action: ${action}`);
      }
    });
    return convertedData.join('\n');
  };
  return `{\n${iter(data, 0)}\n}`;
};

export default stylishFormat;
