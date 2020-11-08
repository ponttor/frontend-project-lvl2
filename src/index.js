/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import render from './parsers/index.js';
import getDiff from './getDiff.js';

const genDiff = (filePath1, filePath2) => {
  const text1 = fs.readFileSync(filePath1, 'utf8');
  const text2 = fs.readFileSync(filePath2, 'utf8');

  const format1 = path.extname(filePath1).slice(1);
  const format2 = path.extname(filePath2).slice(1);

  const data1 = render(text1, format1);
  const data2 = render(text2, format2);

  return getDiff(data1, data2);
};

export default genDiff;
