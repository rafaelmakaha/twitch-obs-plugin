import { imageLoad, audioLoad } from './utils/index.js';
const { io } = window;

const socket = io(window.location.href);
const container = document.getElementById('container');

socket.on('showMessage', async (dados) => {
    console.log('recived message',dados);
    let time = 3000;
    let image = null, sound = null;

    if (dados.image) image = await imageLoad(dados.image);
        
    if (dados.sound){
        audio = await audioLoad(dados.sound.basePath, dados.sound.mp3);
        if (audio.duration > time/1000) time = (audio.duration + 1) * 1000
    }

    const h2 = document.createElement('h2');
    h2.innerHTML = `${dados.author}: \n${dados.message}`;

    if(image) container.appendChild(image);
    if(sound) container.appendChild(audio);
    container.appendChild(h2);

    setTimeout(() => {
        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }
        setTimeout(() => socket.emit('freeFront', true), 1000);
    }, time);

});