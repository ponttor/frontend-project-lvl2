import _ from 'lodash';

const getDiff = (object1, object2, acc) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.union(keys1, keys2).sort();

  const diffTree = keys.map((key) => {
    const isInObject1 = _.has(object1, key);
    const isInObject2 = _.has(object2, key);

    const value1 = object1[key];
    const value2 = object2[key];

    if (isInObject1 && !isInObject2) {
      return {
        action: 'deleted', key, value1, value2: '', acc,
      };
    }
    if (isInObject2 && !isInObject1) {
      return {
        action: 'added', key, value1: '', value2, acc,
      };
    }

    const value1IsObject = _.isObject(value1);
    const value2IsObject = _.isObject(value2);

    if (value1IsObject && value2IsObject) {
      return { action: 'objects', key, children: getDiff(value1, value2, `${acc}.${key}`) };
    }

    if (value1 === value2) {
      return {
        action: 'same', key, value1, value2: '', acc,
      };
    }
    return {
      action: 'updated', key, value1, value2, acc,
    };
  });
  return diffTree;
};

export default getDiff;
