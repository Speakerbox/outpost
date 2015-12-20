'use strict';

let ioClient = require('socket.io-client');
let nconf = require('nconf');
let token = nconf.get('TOKEN');
let socketUrl = nconf.get('socket:url');
let socketOptions = {
  'reconnection': false,
  'force new connection': true
};

module.exports = {
  init: init
}

function init(done){
  console.log('init socket');
  let url = socketUrl + '?token=' + token;

  console.log('url', url);
  let socket = ioClient.connect(url, socketOptions);

  socket.on('error', function(err) {
    console.log(err);
    process.exit();
  });

  socket.on('connect', function(socket, err) {
    console.log('Socket is connected to ' + socketUrl);
  });

  socket.on('disconnect', function(socket) {
    console.log('Socket has been disconnected ');
    process.exit();
  });
};
