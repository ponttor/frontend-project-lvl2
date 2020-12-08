import _ from 'lodash';

const stringify = (value, shift) => {
  const internal = (internalValue, shift2, bracketShift2) => {
    const str = ' '.repeat(shift2);
    const closeStr = ' '.repeat(bracketShift2);
    if (!_.isObject(internalValue)) {
      return internalValue;
    }
    const keys = _.keys(internalValue);
    const result = keys.map((key) => {
      const content = internalValue[key];
      return `${str}${key}: ${internal(content, shift2 + 4, bracketShift2 + 4)}`;
    }).join('\n');
    return `{\n${result}\n${closeStr}}`;
  };
  return internal(value, shift + 8, shift + 4);
};

const stylishFormat = (data) => {
  const goDeep = (object, shift) => {
    const convertedData = object.map((segment) => {
      const {
        action, key, value1, value2, children,
      } = segment;

      // const stringValue = stringify(value, shift - 2);
      const stringValue1 = stringify(value1, shift - 2);
      const stringValue2 = stringify(value2, shift - 2);

      const space2 = '  ';
      const str = ' '.repeat(shift);
      if (action === 'deleted') {
        return `${str}- ${key}: ${stringValue1}`;
      }
      if (action === 'added') {
        return `${str}+ ${key}: ${stringValue2}`;
      }
      if (action === 'objects') {
        return `${str}  ${key}: {\n${goDeep(children, shift + 4)}\n${str}${space2}}`;
      }
      if (action === 'updated') {
        return `${str}- ${key}: ${stringValue1}\n${str}+ ${key}: ${stringValue2}`;
      }
      if (action === 'same') {
        return `${str}  ${key}: ${stringValue1}`;
      }
      return console.log(`Unknown action: ${action}`);
    });
    return convertedData.join('\n');
  };
  return `{\n${goDeep(data, 2)}\n}`;
};

export default stylishFormat;
