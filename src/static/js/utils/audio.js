export const audioLoad = (basePath, mp3) => (
    new Promise((resolve) => {
        const audio = new Audio(basePath + mp3);
        audio.autoplay = true;
        audio.addEventListener('loadeddata', () => resolve(audio));
    })
)
