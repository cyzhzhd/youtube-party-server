const app = require('../dist/app');
const debug = require('debug')('youtube-party-server:server');
const http = require('http');
const dotenv = require('dotenv');
const setIoServer = require('../dist/src/socket');

dotenv.config();

app.set('port', process.env.PORT);

const server = http.createServer(app);
setIoServer.default(server);

server.listen(process.env.PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
