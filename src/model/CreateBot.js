require('dotenv').config()
const tmi = require('tmi.js');
const tts = require('../utils/tts');

class CreateBot {
    constructor(alertQueue) {
        this.alertQueue = alertQueue;
        this.client = new tmi.Client({
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: process.env.TWITCH_USERNAME,
                password: process.env.TWITCH_PASSWORD
            },
            channels: [ 'rmakaha' ]
        });
        this.client.connect();
        this.client.on('message', this.message);
    }

    ttsHandler = ({author, message}, {data: ttsResponse}) => {
        this.alertQueue({
            author, 
            message, 
            // image: 'https://media.giphy.com/media/3orif1VQas10DXIYWk/giphy.gif',
            sound: {
                basePath: 'https://ttsmp3.com/created_mp3/',
                mp3: ttsResponse.MP3
            }
        });
    }

    message = (channel, tags, message, self) => {
        // Ignore echoed messages.
        if(self) return;
        console.log(`Custom Reward ID: ${tags['custom-reward-id']}`);
        // rewards config
        const rewardsConfig = [
            {
                id: 'bd97e0e9-7b68-46d9-ae6e-03d817bcda82',
                rewardFn: tts,
                fnParamns: [message, 'Ricardo'],
                fnHandler: this.ttsHandler,
            },
            {
                id: 'f6dc5998-8896-40de-9d92-118526c31c5c',
                rewardFn: tts,
                fnParamns: [message, 'Vitoria'],
                fnHandler: this.ttsHandler,
            }
        ];

        rewardsConfig.forEach((reward) => {
            if(tags['custom-reward-id'] === reward.id)
                reward.rewardFn(...reward.fnParamns).then((response) => reward.fnHandler({author: tags.username, message}, response));
        })
    }
}

module.exports = CreateBot;
