process.title = 'node-chat';
const WebSocketServer = require('websocket').server;
const http = require('http');
const handleRequest = require('./handleRequest');

const server = http.createServer(function (request, response) {
  console.log(`new request`, request);
});

const PORT = 1337;
server.listen(PORT, function () {
  console.log(`server is listening on port ${PORT}`);
});

// create the server
const wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', handleRequest);