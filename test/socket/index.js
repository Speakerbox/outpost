'use strict';

let expect = require('chai').expect;
let server = require('socket.io')();
let nconf = require('nconf');
let port = nconf.get('socket:port');
let client = require('../../server/socket');

describe('Websocket', function() {
  before(function(done){
    server.listen(port);
    done();
  });

  describe('connect()', function(){
    it('should pass a token during connection', function(done) {
      server.on('connect', function(socket){
        let token = socket.handshake.query.token;
        expect(token).to.be.ok;
        done();
      });

      client.connect();
    });
  });

  describe('disconnect()', function(){
    it('should disconnect the socket', function(done) {
        client.disconnect(function(socket){
        expect(socket.disconnected).to.equal(true);
        done();
      });
    });
  });
});
