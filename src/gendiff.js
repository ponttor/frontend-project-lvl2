#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-a', 'option a')

if (program.a) {
    console.log(program.a)
}
