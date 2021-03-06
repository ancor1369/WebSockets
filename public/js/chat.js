var socket = io();
var user;

var header = document.getElementById("Wlm_message");

function scrollToBottom()
{
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMEssageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop +lastMEssageHeight + newMessageHeight >= scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  console.log('Connected to server');
  header.innerHTML = "Connected to server";
  var params = jQuery.deparam(window.location.search);
  console.log(params);
  user = params.name;
  socket.emit('join', params, function(err)
  {
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
  header.innerHTML = "User disconnected";
});

socket.on('updateUserList', function(users){
  console.log('users list', users);

  var ol = jQuery('<ol></ol>');

  users.forEach(function(user)
  {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);

});


socket.on('newMessage', function (message) {
  console.log(message);  
  var formattedTime = moment(message.createdAt).format('h:mm a');
  header.innerHTML = "Last message received at: " + formattedTime;
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,  
    {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
  console.log(html);
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var htmle = Mustache.render(template,
    {
      from: message.from,
      url: message.urls,
      createdAt: formattedTime      
    });

    jQuery('#messages').append(htmle);
    scrollToBottom();
});

var messageTextBox = jQuery('[name=message]');

var sendButton = jQuery('#message-form');
sendButton.on('submit',function(e){
  e.preventDefault();
  console.log(messageTextBox.val());
  socket.emit('createMessage',{
    from: user,//'User',
    text: messageTextBox.val()
  },function(){
    messageTextBox.val('');
  })
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