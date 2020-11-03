export function audioLoad(basePath, mp3){
  return new Promise((resolve, reject) => {
      const audio = new Audio(basePath + mp3);
      audio.autoplay = true;
      audio.addEventListener('loadeddata', () => resolve(audio) );
  })
}
