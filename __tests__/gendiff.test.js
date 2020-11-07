/* eslint-disable no-underscore-dangle */
// import { strict as assert } from 'assert';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import getDiff from '../src/getDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const fileDiffPath = getFixturePath('fileDiff.txt');

const fileDiff = fs.readFileSync(fileDiffPath, 'utf-8');

test('compare json', () => {
  expect(getDiff(filePath1, filePath2)).toEqual(fileDiff);
});
