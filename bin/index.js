#!/usr/bin/env node
var program = require('commander');
var actions = require('./logic');
var path = require('path')

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
  
program.parse(process.argv);
