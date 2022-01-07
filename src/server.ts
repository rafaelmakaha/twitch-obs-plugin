if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import { GNRequest } from './services/gerenciaNet'

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'src/views')
app.use(bodyParser.json())

const reqGNAlready = GNRequest({
    clientID: process.env.GN_CLIENT_ID,
    clientSecret: process.env.GN_CLIENT_SECRET
})

app.get('/', async (req, res) => {
    const reqGN = await reqGNAlready
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

    const cobResponse = await reqGN.post('v2/cob', dataCob)
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`)

    res.render('qrcode', { qrcodeImage: qrcodeResponse.data.imagemQrcode})

})

app.get('/cobrancas', async(req, res) => {
    const reqGN = await reqGNAlready;

    const cobResponse = await reqGN.get('/v2/cob?inicio=2022-01-01T00:00:00Z&fim=2022-01-07T20:15:30Z')

    res.send(cobResponse.data)
})

app.post('/webhook(/pix)?', async(req, res) => {
    console.log(req.body)
    res.send('200')

})

app.listen(8000, () => {
    console.log('running')
})
