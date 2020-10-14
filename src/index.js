const CreateBot = require('./model/CreateBot');
const express = require('express');
const app = require('express')();
const httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer,{path: '/socket.io'});

const bot = new CreateBot(io.emit.bind(io));
app.use(express.static(__dirname + '/js'));

io.on('connection', (socket) => {
	console.log("User connected!")
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

httpServer.listen(3000, () => {
	console.log('listening on *:3000');
});