import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.union(keys1, keys2);
  const keysSorted = _.sortBy(keys);

  const diffTree = keysSorted.map((key) => {
    if (!_.has(object2, key)) {
      const value = object1[key];
      return {
        type: 'deleted', key, value,
      };
    }
    if (!_.has(object1, key)) {
      const value = object2[key];
      return {
        type: 'added', key, value,
      };
    }

    const value1 = object1[key];
    const value2 = object2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', key, children: buildDiff(value1, value2) };
    }

    if (value1 === value2) {
      return {
        type: 'unchanged', key, value: value1,
      };
    }
    return {
      type: 'updated', key, value1, value2,
    };
  });
  return diffTree;
};

export default buildDiff;
