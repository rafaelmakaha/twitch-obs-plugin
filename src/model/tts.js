const axios = require('axios');

function filterTags(msg) {
  // console.log('msg: ', msg);
  // console.log('msg type: ', typeof msg);
  const newMsg = msg.replace(/</g, ' menor que ')
  return newMsg.replace(/>/g, ' maior que ')
}

function tts(msg, voice) {
  const url = 'https://ttsmp3.com/makemp3_new.php';
  const source = 'ttsmp3';
  const filteredMsg = filterTags(msg);
  console.log(filteredMsg);

  return new Promise((resolve, reject) => {
    axios({
      method:'post',
      url: url,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: `msg=${filteredMsg}&lang=${voice}&source=${source}`
    })
    .then(resolve)
    .catch(reject)
  })
}

module.exports = tts;