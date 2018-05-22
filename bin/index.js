#!/usr/bin/env node
const program = require('commander');
const actions = require('./logic');
const path = require('path')

program
  .version('1.0.1')
  .description('Local folder git')

program
  .command('link <directory>')
  .alias('l')
  .description('Links the current directory to the specified.')
  .action(function(directory){
    actions.link(process.cwd(), directory);
  })
  
program
  .command('push')
  .alias('p')
  .description('Pushes current directory files to the linked one.')
  .action(function(directory){
    actions.push(process.cwd());
  })

program.parse(process.argv);
