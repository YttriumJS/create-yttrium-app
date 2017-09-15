#!/usr/bin/env node
 
/**
 * Module dependencies.
 */
 
const program = require('commander');
const path = require('path');
const ascii = require('./art');
const info = require(path.resolve(`${__dirname}/package.json`));
 
program
  .version(info.version)
  .option('new [args]', 'Create new applications')
  .parse(process.argv);

console.log(ascii());

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
console.log(program);
