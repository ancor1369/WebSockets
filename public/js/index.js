var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from: 'Frank',
//   text: 'Hi'
// },function(data){
//   console.log('Got it', data);
// });

socket.on('newLocationMessage',function(message){
  console.log(message);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</<a>');
  li.text(`${message.from}: `);
  a.attr('href', message.urls);
  li.append(a);

  jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('')
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function()
{
  if(!navigator.geolocation)
  {
    return alert('Geolocation is not supported on this browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });    
  },function(){
    locationButton.removeAttr('disabled');
    alert('Unable to fetch location')
  });
});