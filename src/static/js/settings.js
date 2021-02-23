const getToken = () => {
  try {
    let token = localStorage.getItem('tokenTwitch')
    if (!token) {
      const [accessToken] = location.hash.split('&')
      token = accessToken.split('=').pop()
      localStorage.setItem('tokenTwitch', token)
    } else {
      validateToken(token)
    }
    return token
  } catch (error) {
    console.log('getToken Error: ', error)
  }
}

const validateToken = (token) => {
  const url = 'https://id.twitch.tv/oauth2/validate'
  fetch(url, {
    headers: {
      Authorization: 'OAuth ' + token
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response.ok) console.log(response.json())
    })
    .catch(error => console.log('validateToken Error: ', error))
}

getToken()
