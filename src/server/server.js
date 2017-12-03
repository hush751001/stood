'use strict'

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import compression from 'compression';
import cardManager from './cardManager';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

app.use(compression({}));
app.use(express.static(__dirname + '/../client'));


// #########################################

let numUsers = 0;
let users = {};

cardManager.init();

io.on('connection', (socket) => {
  numUsers++;
  console.log('numUsers : ', numUsers);
  console.log('id : ', socket.id);

  socket.emit('set id', socket.id);

  // 결정
  socket.on('call', () => {
    // 결정함.
    socket.called = true;

    io.sockets.to('playing room').clients((error, clients)=> {
      let sockets = [];
      clients.forEach((clientId) => {
        sockets.push(io.sockets.to('playing room').connected[clientId]);
      });

      // 모두가 call이면 결론을 낸다.
      const isAllCalled = sockets.every((client)=> {
        return client.called;
      });

      if(isAllCalled) {
        sockets.sort((a,b) => {
          return a.userdata.number < b.userdata.number;
        });
        
        io.sockets.to('playing room').emit('win', sockets[0].username, sockets[0].userdata, sockets[0].id);
      }
    
      let usernames = [];
      sockets.forEach((client)=>{
        if(client.called) {
          usernames.push(client.username);
        }
      });

      io.sockets.to('playing room').emit('called', usernames);
    });
  });

  // 게임 참여
	socket.on('join', (username) => {
    console.log('username : ' + username);

    // playing room방 입장
    socket.join('playing room', () => {
      const rooms = Object.keys(socket.rooms);
      console.log(rooms);

      io.sockets.to('playing room').clients((error, clients)=> {
        let sockets = [];
        clients.forEach((clientId) => {
          sockets.push(io.sockets.to('playing room').connected[clientId]);
        });

        let usernames = [];
        sockets.forEach((client)=>{
          usernames.push(client.username);
        });

        io.sockets.to('playing room').emit('joined', usernames);
      });
    });
    
    // 카드 2개를 내려준다.
    const data = cardManager.getTwoCards();
    if(data) {
      // 카드 2장을 나눠준다.
      socket.emit('sendCards', data);
    } else {
      socket.emit('noCard', 'server has no card.');
    }

    socket.username = username;
    socket.userdata = data;
  });
  
  socket.on('onemore', () => {
    // 내카드를 반납하고, 다시 받는다.
    cardManager.putBack(socket.userdata);

    // 카드 2개를 내려준다.
    const data = cardManager.getTwoCards();
    if(data) {
      // 카드 2장을 나눠준다.
      socket.emit('sendCards', data);
    } else {
      // 카드가 없어졌을 수도 있겠구나
    }

    socket.userdata = data;
  });

  socket.on('disconnect', () => {
    --numUsers;
    console.log('numUsers : ', numUsers);
    console.log('id : ', socket.id);
  });
});

server.listen(port, () => {
  console.log('[INFO] Listening on *:' + port);
});
