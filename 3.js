var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var server = new Hapi.Server();

server.register(Inert, function(err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});


server.route({path: '/', method:'GET', handler: {
    file: Path.join(__dirname, '/index.html')
  }
});

server.start(function(){});
