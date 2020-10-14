const CreateBot = require('./model/CreateBot');
const express = require('express');
const app = require('express')();
const httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);

io.on("connection", (socket) => {
	const bot = CreateBot(socket.emit);
});

app.use(express.static(__dirname + '/js'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

httpServer.listen(3000, () => {
	console.log('listening on *:3000');
});