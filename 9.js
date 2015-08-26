var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');
var Joi = require('joi');
var server = new Hapi.Server();

server.register(Inert, function(err) {
  if (err) throw err;
});

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});


server.route({
  path: '/chickens/{breed}',
  method:'GET',
  handler: function (request, reply){
    reply('You asked for the chicken ' + request.params.breed);
  },
  config: {
    validate: {
      params: {
        breed: Joi.string().required()
      }
    }
  }
});

server.start(function(){});
