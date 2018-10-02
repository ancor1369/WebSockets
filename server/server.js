const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const message =  require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to the chat app',
  //   createdAt: new Date().getTime()
  // });

  socket.emit('newMessage', 
  message.generateMessage('Andres', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', 
  // {
  //   from: 'Admin',
  //   text: 'New user joined',
  //   createdAt: new Date().getTime()
  // }
  message.generateMessage('Admin', 'New user has joined')
  );

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);
    io.emit('newMessage', message.generateMessage(msg.from, msg.text));
    callback('This is from the server');   
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
