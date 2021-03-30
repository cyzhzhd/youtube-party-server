import { Server, Socket } from 'socket.io';
import { Party } from './models/partyModel.js';

const setIoServer = function (server: import('http').Server): void {
  const ioServer = new Server(server, { transports: ['websocket'] });

  ioServer.on('connection', (socket: Socket) => {
    socket.emit('sessionId', socket.id);

    socket.on('joinPartyRoom', ({ partyId }) => {
      socket.join(partyId);
    });
    socket.on('leavePartyRoom', ({ partyId }) => {
      socket.leave(partyId);
    });

    socket.on('sendMsg', ({ uid, nickName, content, partyId }) => {
      const msg = {
        uid,
        nickName,
        content,
        partyId,
        time: Date.now(),
      };
      ioServer.in(partyId).emit('deliverChat', msg);
    });

    socket.on('updateVideoList', async ({ partyId, videoId, add }) => {
      try {
        const filter = { _id: partyId };
        let condition;
        add
          ? (condition = { $addToSet: { videos: { vid: videoId, title: null } } })
          : (condition = { $pull: { videos: { vid: videoId } } });

        const updatedParty = await Party.findOneAndUpdate(filter, condition, { new: true });
        ioServer.in(partyId).emit('deliverPartyDetail', updatedParty);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('syncVideoTime', ({ partyId, videoId, time }) => {
      socket.to(partyId).emit('deliverVideoTime', { videoId, time });
    });

    socket.on('syncVideoId', ({ partyId, videoId }) => {
      socket.to(partyId).emit('deliverVideoId', { videoId });
    });
  });
};

export default setIoServer;
