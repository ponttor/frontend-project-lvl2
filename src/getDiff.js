/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

// const render = JSON.parse;

const getDiff = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const keys = _.union(keys1, keys2);
  keys.sort();
  let result = '{\n';
  for (const key of keys) {
    if (object1[key] === object2[key]) {
      result += `    ${key}: ${object1[key]}\n`;
    }
    if ((object1[key] !== object2[key]) && (_.has(object1, key)) && (_.has(object2, key))) {
      result += `  - ${key}: ${object1[key]}\n`;
      result += `  + ${key}: ${object2[key]}\n`;
    }
    if ((object1[key] !== object2[key]) && (_.has(object1, key)) && (object2[key] === undefined)) {
      result += `  - ${key}: ${object1[key]}\n`;
    }
    if ((object1[key] !== object2[key]) && (_.has(object2, key)) && (object1[key] === undefined)) {
      result += `  + ${key}: ${object2[key]}\n`;
    }
  }
  result += '}';
  return result;
};

export default getDiff;
