const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const path = require('path');

const MessagesQueue = require('./model/MessagesQueue');
const CreateBot = require('./model/CreateBot');
const settings = require('./routes/settings');

const startServer = async () => {
	try {
		const app = express();
		const httpServer = http.createServer(app);

		const io = socketIo(httpServer, {path: '/socket.io'});

		const messagesQueue = new MessagesQueue(io.emit.bind(io));
		const bot = new CreateBot(messagesQueue.queue);

		app.use(express.static(path.join(__dirname, '/static')));
		app.use(settings)

		const connectedSocketClients = [];

		io.on('connection', (socket) => {
			console.log('User connected!');
			const hasClients = !!connectedSocketClients.length;
			console.log('Has Clients:', hasClients);
			if(hasClients) return socket.disconnect(true);
			
			connectedSocketClients.push(socket)
			socket.on('freeFront', messagesQueue.free);
			socket.on('disconnect', (reason) => {
				console.log('socket disconnected: ', reason);
				connectedSocketClients.pop()
			})
		});

		httpServer.listen(3000, () => console.log('Server listenin on :3000'));

	} catch (error) {
		console.log('Error in start server', error)
	}
}

startServer();
