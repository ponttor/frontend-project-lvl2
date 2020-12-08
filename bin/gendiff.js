#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output formats: stylish, plain, json', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(genDiff(file1, file2, program.format));
  });

program.parse(process.argv);
