// import { strict as assert } from 'assert';
import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import getDiff from '../src/getDiff';

// assert(getDiff('file_source/file1.json', 'file_source/file2.json') ===
// fs.readFileSync('file_source/fileDiff.txt', 'utf-8'));

const getPath = (name) => path.join(__dirname, name);
const plain1 = getPath('file_source/file1.json');
const plain2 = getPath('file_source/file2.json');
console.log(plain1);
console.log(plain2);

test('compare json', () => {
  expect(getDiff('file_source/file1.json', 'file_source/file2.json')).toEqual(fs.readFileSync('file_source/fileDiff.txt', 'utf-8'));
});