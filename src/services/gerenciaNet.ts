import axios from 'axios'
import fs from 'fs'
import path from 'path'
import https from 'https'
import {TCredentials} from '../types'

const cert = fs.readFileSync(
  path.resolve(__dirname, `../../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: ''
});

const authenticate = ({clientID, clientSecret}: TCredentials) => {
  const credentials = Buffer.from(
    `${clientID}:${clientSecret}`
  ).toString('base64');
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

export const GNRequest = async(credentials: TCredentials) => {
  const authResponse = await authenticate(credentials)
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
