import axios from 'axios'
import fs from 'fs'
import path from 'path'
import https from 'https'

const cert = fs.readFileSync(
  path.resolve(__dirname, `../../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: ''
});

const credentials = Buffer.from(
  `${process.env.GN_CLIENT_ID}:${process.env.GN_CLIENT_SECRET}`
).toString('base64');

const authenticate = () => {
  return axios({
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
  }) 
}

export const GNRequest = async() => {
  const authResponse = await authenticate()
  const accessToken = authResponse.data?.access_token
  return axios.create({
    baseURL: process.env.GN_ENDPOINT,
    httpsAgent: agent,
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }
  })
}
