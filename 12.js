var Hapi = require('hapi');
var Boom = require('boom');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.state('session', {
  path: '/',
  encoding: 'base64json',
  ttl: 10,
  domain: 'localhost'
});

server.route({
  path: '/set-cookie',
  method:'GET',
  handler: function (request, reply){
    return reply({
      message: 'success',
    }).state('session', {key: 'makemehapi'});
  },
  config: {
    state: {
      parse: true,
      failAction: 'log' 
    }
  }
});

server.route({
  method: 'GET',
  path: '/check-cookie',
  handler: function (request, reply) {
    var session = request.state.session;
    var result;

    if (session) {
      result = {user: 'hapi'};
    } else {
      result = Boom.unauthorized('Missing authentication');
    }
    reply(result);
  }
});
server.start(function(){});
