#!/usr/bin/env node

import getDiff from '../getDiff.js';
import commander from 'commander';
const { Command } = commander;

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(getDiff(file1, file2));
});

  program.parse(process.argv);