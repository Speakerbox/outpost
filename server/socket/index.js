'use strict';

let Speaker = require('speaker');
let ioClient = require('socket.io-client');
let ioStream = require('socket.io-stream');
let mic = require('microphone');
let nconf = require('nconf');
let token = nconf.get('TOKEN');
let socketUrl = nconf.get('socket:url');
let socket;

let speaker = new Speaker({
  channels: 2,
  bitDepth: 16,     
  sampleRate: 44100    
});

module.exports = {
  connect: connect,
  disconnect: disconnect
}

function connect(done){
  let url = socketUrl + '?token=' + token;
  let socketOptions = {
    'force new connection' : true,
    'reconnection': true,
    'reconnectionDelay': 2000,                  
    'reconnectionDelayMax' : 60000,             
    'reconnectionAttempts': 'Infinity',
    'transports': ['websocket']
  };

  socket = ioClient.connect(url, socketOptions);

  socket.on('error', function(err) {
    console.log(err);
  });

  socket.on('connect', function() {
    console.log('Socket is connected to ' + socketUrl);

    let stream = ioStream.createStream();

    mic.startCapture();
    mic.audioStream.pipe(stream);

    ioStream(socket).on('receiveAudio', function(stream){
      stream.pipe(speaker);
    });

    ioStream(socket).emit('streamAudio', stream);
  });

  socket.on('disconnect', function(socket) {
    console.log('Socket has been disconnected');
  });

};

function disconnect(done){
  socket.disconnect();
  done(socket);
}
