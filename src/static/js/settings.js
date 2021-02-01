const getToken = () => {
    try {
        let token = localStorage.getItem('tokenTwitch')
        if(!token) {
            const [accessToken] = location.hash.split('&')
            token = accessToken.split('=').pop()
            localStorage.setItem('tokenTwitch', token)
        }
        return token
    } catch (error) {
        console.log('Error', error)
    }
}

const validateToken = () => {
    
}