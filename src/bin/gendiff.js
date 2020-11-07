#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import commander from 'commander';
import getDiff from '../getDiff.js';

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
