import { imageLoad, audioLoad } from './utils/index.js';
const { io } = window;

const socket = io(window.location.href);
const container = document.getElementById('container');

socket.on('emitX', async (dados) => {
    try {
        console.log(dados);
        
        //const image = await imageLoad(dados.image);
        //const audio = await audioLoad(dados.audio);
        const h2 = document.createElement('h2');
        
        h2.innerHTML = `${dados.author}: ${dados.message}`;
        //container.appendChild(image);
        container.appendChild(h2);
        //container.appendChild(audio);

        setTimeout(() => {
            const [txt] = container.childNodes;
            //container.removeChild(img)
            container.removeChild(txt)
           // container.removeChild(aud)
        }, 5000);
        setTimeout(() => {
            socket.emit('freeFront', true);
        }, 6000);
    } catch (error) {
        console.log('abc ',error)
    }
});