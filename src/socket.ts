import { Socket } from 'socket.io';
import { Party } from './models/partyModel.js';

const setIoServer = function (server: import('http').Server): void {
  const ioServer = require('socket.io')(server, { transports: ['websocket'] });

  ioServer.on('connection', (socket: Socket) => {
    socket.emit('sessionId', socket.id);
    socket.on('join', async (data) => {
      try {
        console.log("join data", data);
        socket.join(data);
        const party = await Party.findById(data);
        console.log(party);
        socket.emit('deliverPartyDetail', party);
      } catch (error) {
        console.log(error);
      }
    })

    socket.on('sendMsg', (data) => {
      const { uid, content, partyId } = data;

      const msg = {
        uid, content, partyId, time: Date.now()
      };

      console.log('got message', data);
      ioServer.in(partyId).emit('deliverChat', msg)
    })

    socket.on('updateVideoList', async (data) => {
      try {
        console.log('updatedVideoList', data);
        const { partyId, videoId, add } = data;

        let updatedParty
        const filter = { _id: partyId };
        let cond;
        if(add) {
          cond = {
            $addToSet: {
              videos: videoId,
            }
          };
        } else {
          cond = {
            $pull: {
              videos: videoId,
            }
          };
        }

        updatedParty = await Party.findOneAndUpdate(filter, cond, {
          new: true
        });
        ioServer.in(partyId).emit('deliverPartyDetail', updatedParty);
      } catch (error) {
        console.log(error);
      }
    })

    socket.on('syncVideoTime', data => {
      const { partyId, videoId, time } = data;
      console.log(data);
      socket.to(partyId).emit('deliverVideoTime', { videoId, time });
    })

    socket.on('syncVideoId', data => {
      const {partyId, videoId} = data;
      socket.to(partyId).emit('deliverVideoId', {videoId})
    })
  })
}

export default setIoServer;