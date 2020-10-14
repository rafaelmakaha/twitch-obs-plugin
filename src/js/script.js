import { A } from './app.js';
const { io } = window;

const socket = io();

const text = document.getElementById("text");

socket.on('emitX', (dados) => {
    console.log(dados);
    text.innerHTML = dados;
});