const CreateBot = require('./model/CreateBot');
const AlertQueue = require('./model/AlertQueue')
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer,{path: '/socket.io'});


const queue = new AlertQueue(io.emit.bind(io));

const bot = new CreateBot(queue.queue);

app.use(express.static(__dirname + '/js'));

io.on('connection', (socket) => {
	console.log("User connected!")
	socket.on('freeFront', queue.free);
});


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

httpServer.listen(3000, () => {
	console.log('listening on *:3000');
});