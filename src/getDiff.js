import _ from 'lodash';
import fs from 'fs';

const render = JSON.parse;

const getDiff = (path1, path2) => {
const text1 = fs.readFileSync(path1,'utf8');
const object1 = render(text1);

const text2 = fs.readFileSync(path2,'utf8');
const object2 = render(text2);

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const keys = _.union(keys1, keys2);
  keys.sort();
  let result = '{\n';
  for ( const key of keys) {
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
  result += '}'
return result;
}

export default getDiff;