/* eslint-disable no-underscore-dangle */

import _ from 'lodash';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

const jsonTreePath1 = getFixturePath('fileTree1.json');
const jsonTreePath2 = getFixturePath('fileTree2.json');
const ymlTreePath1 = getFixturePath('fileTree1.yml');
const ymlTreePath2 = getFixturePath('fileTree2.yml');
const fileTreeDiffPath = getFixturePath('fileTreediff.txt');
const plainDiffPath = getFixturePath('plainDiff.txt');
const jsonDiffPath = getFixturePath('fileJson.txt');

const fileTreeDiff = fs.readFileSync(fileTreeDiffPath, 'utf-8');
const plainDiff = fs.readFileSync(plainDiffPath, 'utf-8');
const jsonDiff = fs.readFileSync(jsonDiffPath, 'utf-8');

const coll = [fileTreeDiff, jsonDiff, plainDiff];

test.each([[jsonTreePath1, jsonTreePath2],
  [ymlTreePath1, ymlTreePath2]])(
  'compare files, plain and json format',
  (file1, file2) => {
    expect(_.includes(coll, genDiff(file1, file2))).toBe(true);
    expect(_.includes(coll, genDiff(file1, file2, 'plain'))).toBe(true);
    expect(_.includes(coll, genDiff(file1, file2, 'json'))).toBe(true);
  },
);
