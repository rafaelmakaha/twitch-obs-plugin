import { imageLoad } from './utils/image.js';
const { io } = window;

const socket = io(window.location.href);
const container = document.getElementById('container');

socket.on('emitX', async (dados) => {
    try {
        console.log(dados);
        const image = await imageLoad(dados.image)
        const h2 = document.createElement('h2');
        
        h2.innerHTML = `${dados.author}: ${dados.message}`;
        container.appendChild(image);
        container.appendChild(h2);

        setTimeout(() => {
            const [img, txt] = container.childNodes;
            container.removeChild(img)
            container.removeChild(txt)
        }, 5000);
        setTimeout(() => {
            socket.emit('freeFront', true);
        }, 6000);
    } catch (error) {
        console.log(error)
    }
});