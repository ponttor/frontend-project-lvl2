/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const fileTreeDiffPath = getFixturePath('fileTreediff.txt');
const plainDiffPath = getFixturePath('plainDiff.txt');
const jsonDiffPath = getFixturePath('fileJson.txt');

const fileTreeDiff = fs.readFileSync(fileTreeDiffPath, 'utf-8');
const plainDiff = fs.readFileSync(plainDiffPath, 'utf-8');
const jsonDiff = fs.readFileSync(jsonDiffPath, 'utf-8');

test.each(['json', 'yml'])(
  'compare files, stylish, plain, json format',
  (format) => {
    const file1 = getFixturePath(`fileTree1.${format}`);
    const file2 = getFixturePath(`fileTree2.${format}`);

    expect(genDiff(file1, file2)).toEqual(fileTreeDiff);
    expect(genDiff(file1, file2, 'plain')).toEqual(plainDiff);
    expect(genDiff(file1, file2, 'json')).toEqual(jsonDiff);
  },
);
