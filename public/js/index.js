var socket = io();

// creating event handlers for client-side
socket.on('connect', function () {
	console.log('Connected to server');

	// socket.emit('createMessage', {
	// 	from: 'Andrew',
	// 	text: 'Hey. this is andrew, I\'m on Jen\'s email, somebody stop me!'
	// });
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);

	// console.log('You got a new message!', message);
	// var li = jQuery('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);

	// jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		createdAt: message.createdAt,
		url: message.url
	});

	jQuery('#messages').append(html);

	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// jQuery('#messages').append(li);
});

socket.emit('createMessage', {
	from: 'Frank',
	text: 'Hi'
}, function (data) {
	console.log(data);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function (data) {
		//the acknowledgement function
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Your browser does not support geolocation');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Sending location...');
		alert('Unable to fetch location');
	});
});