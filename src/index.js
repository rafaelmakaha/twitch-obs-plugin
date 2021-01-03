const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const path = require('path');

const MessagesQueue = require('./model/MessagesQueue');
const CreateBot = require('./model/CreateBot');

const app = express();
const httpServer = http.createServer(app);

const io = socketIo(httpServer, {path: '/socket.io'});

const messagesQueue = new MessagesQueue(io.emit.bind(io));
new CreateBot(messagesQueue.queue);

app.use(express.static(path.join(__dirname, '/static')));

const connectedSocketClients = [];

io.on('connection', (socket) => {
	console.log('User connected!');
	const hasClients = !!connectedSocketClients.length;
	console.log('Has Clients:', hasClients);
	if(hasClients) return socket.disconnect(true);
	
	connectedSocketClients.push(socket)
	socket.on('freeFront', messagesQueue.free);
	socket.on('disconnect', () => connectedSocketClients.pop())
});

httpServer.listen(3000, () => console.log('Server listenin on :3000'));