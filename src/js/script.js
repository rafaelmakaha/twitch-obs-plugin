import { A } from './app.js';
const { io } = window;

const socket = io(window.location.href);

const text = document.getElementById("text");

socket.on('emitX', (dados) => {
    console.log(dados);
    text.innerHTML = `${dados.author}: ${dados.message}`;
    setTimeout(() => {
        text.innerHTML = '';
    }, 5000);
    setTimeout(() => {
        socket.emit('freeFront', true);
    }, 6000);
});