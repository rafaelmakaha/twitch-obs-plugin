const axios = require('axios');

function tts(msg, voice) {
  const url = 'https://ttsmp3.com/makemp3_new.php';
  const source = 'ttsmp3';

  return new Promise((resolve, reject) => {
    axios({
      method:'post',
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `msg=${msg}&lang=${voice}&source=${source}`
    })
    .then(resolve)
    .catch(reject)
  })
}

module.exports = tts;