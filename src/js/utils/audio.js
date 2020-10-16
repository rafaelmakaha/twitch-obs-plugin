export function audioLoad(url){
  return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      audio.autoplay = true;
      audio.addEventListener('loadeddata', () => resolve(audio) );
  })
}
