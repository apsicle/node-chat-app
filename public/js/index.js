var socket = io();

// creating event handlers for client-side
socket.on('connect', function () {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'Andrew',
		text: 'Hey. this is andrew, I\'m on Jen\'s email, somebody stop me!'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('You got a new message!', message);
});
