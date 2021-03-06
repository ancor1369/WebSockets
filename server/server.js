const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const message =  require('./utils/message');
const {isRealStrig} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join',(params, callback)=>
  {
    if(!isRealStrig(params.name) || !isRealStrig(params.room))
    {
      return callback('Name and Room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', message.generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',message.generateMessage('Admin', `${params.name} has joined`));    
    callback();
  });

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);
    io.emit('newMessage', message.generateMessage(msg.from, msg.text));    
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');

    var user = users.removeUser(socket.id);
    if(user)
    {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', message.generateMessage('Admin', `${user.name} has left`));
    }

  });

  socket.on('createLocationMessage',(location)=>
  {
    console.log(location);
    io.emit('newLocationMessage', 
    message.generateLocationMessage('Admin', location.latitude, location.longitude));
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
