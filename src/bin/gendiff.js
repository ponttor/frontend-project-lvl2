#!/usr/bin/env node
import pkg from 'commander';
const { Command } = pkg;

const program = new Command();

program
.version('0.0.1', '-v, --vers', 'output the version number')
.description('Compares two configuration files and shows a difference.');

program.parse(process.argv);