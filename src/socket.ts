import { Socket } from 'socket.io';

const setIoServer = function (server: import('http').Server): void {
  const ioServer = require('socket.io')(server, { transports: ['websocket'] });

  ioServer.on('connection', (socket: Socket) => {
    socket.emit('sessionId', socket.id);
    socket.on('join', (data) => {
      console.log("join data", data);
    })
  })
}

export default setIoServer;