const axios = require('axios');
const FormData = require('form-data');


function tts(msg, voice) {
  const form = new FormData();
  const url = 'https://ttsmp3.com/makemp3_new.php';
  const source = 'ttsmp3';

  form.append('msg', msg);
  form.append('lang', voice);
  form.append('source', source);
  const formHeaders = form.getHeaders();
  // console.log(form)
  
  axios.post(url, form, {
    headers: {...formHeaders}
  })
  .then(response => console.log(response))
  .catch(err => err)
}

module.exports = tts;