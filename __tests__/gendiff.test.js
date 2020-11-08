/* eslint-disable no-underscore-dangle */
// import { strict as assert } from 'assert';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');
const ymlPath1 = getFixturePath('file1.yml');
const ymlPath2 = getFixturePath('file2.yml');
const fileDiffPath = getFixturePath('fileDiff.txt');

const fileDiff = fs.readFileSync(fileDiffPath, 'utf-8');

test('compare json', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toEqual(fileDiff);
});

test('compare yml', () => {
  expect(genDiff(ymlPath1, ymlPath2)).toEqual(fileDiff);
});
