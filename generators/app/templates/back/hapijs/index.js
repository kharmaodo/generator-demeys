'use strict';

const Hapi = require('hapi'),
    port = process.env.PORT || 3000,
    context = '/api';

const server = new Hapi.Server();
server.connection({ port: port, host: 'localhost' });

server.route({
    method: 'GET',
    path: context + '/',
    handler: function (request, reply) {
        reply({"projectName": "<%= projectName %>"});
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('server started on port %s', server.info.port)
});