import { imageLoad, audioLoad } from './utils/index.js';
const { io } = window;

const socket = io(window.location.href);
const container = document.getElementById('container');

socket.on('showMessage', (dados) => {
    console.log(dados);
    let time = 3000;

    if (dados.image){
        const image = await imageLoad(dados.image);
        container.appendChild(image);
    }

    if (dados.sound){
        const audio = await audioLoad(dados.sound.basePath, dados.sound.mp3);
        container.appendChild(audio);
        if (audio.duration > time/1000)
            time = (audio.duration + 1) * 1000
    }

    const h2 = document.createElement('h2');
    h2.innerHTML = `${dados.author}: \n${dados.message}`;
    container.appendChild(h2);

    setTimeout(() => {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }

        setTimeout(() => socket.emit('freeFront', true), 1000);
    }, time);

});