export const audioLoad = (basePath, mp3) => {
  return new Promise((resolve) => {
    const url = basePath[0] === '.' ? mp3 : new URL(mp3, basePath)
    const audio = new Audio(url)
    console.log(audio)
    audio.autoplay = true
    audio.addEventListener('loadeddata', () => resolve(audio))
  })
}
