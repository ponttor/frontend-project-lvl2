import { strict as assert } from 'assert';
import getDiff from '../src/getDiff.js';
import fs from 'fs';

assert(getDiff('file_source/file1.json', 'file_source/file2.json') === fs.readFileSync('file_source/fileDiff.txt', 'utf-8'));