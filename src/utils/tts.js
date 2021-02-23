const axios = require('axios')

const filterTags = (msg) => {
  const newMsg = msg.replace(/</g, ' menor que ').replace(/>/g, ' maior que ')
  return newMsg
}

const tts = (msg, voice) => {
  const url = 'https://ttsmp3.com/makemp3_new.php'
  const source = 'ttsmp3'
  const filteredMsg = filterTags(msg)

  const axiosConfiguration = {
    method: 'post',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: `msg=${filteredMsg}&lang=${voice}&source=${source}`
  }

  return new Promise((resolve, reject) => {
    axios(axiosConfiguration)
      .then(resolve)
      .catch(reject)
  })
}

module.exports = tts
