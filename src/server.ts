if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

import axios from 'axios'
import fs, { access } from 'fs'
import path from 'path'
import https from 'https'

const cert = fs.readFileSync(
    path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
    pfx: cert,
    passphrase: ''
});

const credentials = Buffer.from(
    `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
).toString('base64');

axios({
    method: 'POST',
    url: `${process.env.GN_ENDPOINT}/oauth/token`,
    headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    data: {
        grant_type: 'client_credentials'
    }
}).then((response) => {
    const accessToken = response.data?.access_token

    const reqGN = axios.create({
        baseURL: process.env.GN_ENDPOINT,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })

    const dataCob = {
        "calendario": {
          "expiracao": 3600
        },
        "valor": {
          "original": "100.00"
        },
        "chave": "71cdf9ba-c695-4e3c-b010-abb521a3f1be",
        "solicitacaoPagador": "Informe o número ou identificador do pedido."
      }

    reqGN.post('v2/cob', dataCob).then(response => console.log(response.data))
});

