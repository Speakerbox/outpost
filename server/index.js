'use strict';

let async = require('async');
let socket = require('./socket');

module.exports = {
  init: init
}

function init(done){
  var tasks = [
    socket.init
  ];
  async.series(tasks, done);
};
