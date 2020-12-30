import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './treeBuilder.js';
import format from './formatters/index.js';

const genDiff = (filePath1, filePath2, type = 'stylish') => {
  const text1 = fs.readFileSync(filePath1, 'utf8');
  const text2 = fs.readFileSync(filePath2, 'utf8');

  const type1 = path.extname(filePath1).slice(1);
  const type2 = path.extname(filePath2).slice(1);

  const data1 = parse(text1, type1);
  const data2 = parse(text2, type2);

  const difference = buildDiff(data1, data2);
  const result = format(difference, type);
  return result;
};

export default genDiff;
