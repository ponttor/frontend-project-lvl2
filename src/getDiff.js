import _ from 'lodash';

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.union(keys1, keys2);
  const keysSorted = _.sortBy(keys);

  const diffTree = keysSorted.map((key) => {
    const isInObject1 = _.has(object1, key);
    const isInObject2 = _.has(object2, key);

    const value1 = (isInObject1) ? object1[key] : object1[key];
    const value2 = (isInObject2) ? object2[key] : object2[key];

    if (!isInObject2) {
      return {
        action: 'deleted', key, value: value1,
      };
    }
    if (!isInObject1) {
      return {
        action: 'added', key, value: value2,
      };
    }

    const value1IsObject = _.isPlainObject(value1);
    const value2IsObject = _.isPlainObject(value2);

    if (value1IsObject && value2IsObject) {
      return { action: 'nested', key, children: getDiff(value1, value2) };
    }

    if (value1 === value2) {
      return {
        action: 'unchanged', key, value: value1,
      };
    }
    return {
      action: 'updated', key, value1, value2,
    };
  });
  return diffTree;
};

export default getDiff;
