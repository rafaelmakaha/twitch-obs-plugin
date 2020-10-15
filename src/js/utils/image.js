export function imageLoad(url){
    return new Promise((resolve, reject) => {
        const image = new Image(300,300);
        image.src = url;
        image.onload = () => {
            resolve(image)
        }
        image.onerror = (err) => {
            reject(err)
        }
    })
}
