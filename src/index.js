const CreateBot = require('./model/CreateBot');
const AlertQueue = require('./model/AlertQueue')
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer,{path: '/socket.io'});
const cors = require('cors');
const path = require('path');


app.use(cors());
const queue = new AlertQueue(io.emit.bind(io));
const bot = new CreateBot(queue.queue);

app.use(express.static(path.join(__dirname, '/static')));

io.on('connection', (socket) => {
	console.log("User connected!")
	socket.on('freeFront', queue.free);
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/index.html'));
});

httpServer.listen(3000, () => {
	console.log('listening on *:3000');
});