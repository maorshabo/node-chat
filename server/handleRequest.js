const Message = require('./message');
const log = require('./logger');

// latest 100 messages
let history = [];
// list of currently connected clients (users)
const clients = [];

const colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
// ... in random order
colors.sort(() => Math.random() > 0.5);

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function handleRequest(request) {
  const connection = request.accept(null, request.origin);
  console.log(`${new Date()} Connection from origin ${request.origin}.`);
  // This is the most important callback for us, we'll handle
  // all messages from users here.
  const index = clients.push(connection) - 1;
  let userName = false;
  let userColor = false;

  console.log((new Date()) + ' Connection accepted.');
  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(new Message('history', history).toJSON());
  }

  connection.on('message', function (message) {
    if (message) {
      const msg = message;
      if (message.type === 'utf8') {
        if (userName === false) {
          // remember user name
          userName = htmlEntities(message.utf8Data);
          // get random color and send it back to the user
          userColor = colors.shift();
          connection.sendUTF(new Message('color', userColor).toJSON());
          log(`User is known as: ${userName} with ${userColor} color.`);
        }
        else {
          log(`Received Message from ${userName}: ${msg.utf8Data}`);

          // we want to keep history of all sent messages
          const obj = {
            time: (new Date()).getTime(),
            text: htmlEntities(msg.utf8Data),
            author: userName,
            color: userColor
          };
          history.push(obj);
          history = history.slice(-100);
          // broadcast message to all connected clients
          const message = new Message('message', obj);
          clients.forEach(client => {
            client.send(message.toJSON());
          });
        }
      }
    }
  });

  connection.on('close', function (connection) {
    if (userName !== false && userColor !== false) {
      log(`Peer ${connection.remoteAddress} disconnected.`);
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });
}

module.exports = handleRequest;