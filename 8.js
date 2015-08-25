var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var rot13 = require('rot13-transform');
var fs = require('fs');
var server = new Hapi.Server();

var file = fs.createReadStream('./test.txt');
var stream = file.pipe(rot13())

server.register(Inert, function(err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.route({path: '/', method:'GET', handler: function (request, reply) {
  reply(stream);
}
});

server.start(function(){});
