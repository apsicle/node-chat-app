const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//socket is the client-server connection
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new challenger has arrived'));

	socket.on('createMessage', (message, callback) => {

		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		// socket.broadcast (indicates every user BUT the socket calling broadcast)
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });

		callback('This is from server');
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

app.get('/', (req, res) => {
	res.render('index');
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
});