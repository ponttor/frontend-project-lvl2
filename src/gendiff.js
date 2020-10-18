#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .option('-a', 'option a')

if (program.a) {
    console.log(program.a)
}
