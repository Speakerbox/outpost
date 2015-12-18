'use strict';

// Load the local (git ingnored) .env file into env.process
let dotenv = require('dotenv').load();

let nconf = require('nconf');
let env = process.env.NODE_ENV || 'development';
let localEnv =  __dirname + '/env/' + env + '.json'

module.exports = function(){  
  // Load nconf with command line arguments, environment variables, and our local config in order of precendence.  
  nconf
    .argv()
    .env()
    .file(localEnv);
}();