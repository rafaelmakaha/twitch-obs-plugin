require('dotenv').config()
const tmi = require('tmi.js');
const tts = require('./tts');

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
    message = (channel, tags, message, self) => {
        // Ignore echoed messages.
        if(self) return;
        console.log(`Custom Reward ID: ${tags['custom-reward-id']}`);
        // Action on TTS
        if(tags['custom-reward-id'] == 'bd97e0e9-7b68-46d9-ae6e-03d817bcda82'){
            tts(message, 'Ricardo')
            .then((res) => {
                this.alertQueue({
                    author: tags.username, 
                    message: message, 
                    // image: 'https://media.giphy.com/media/3orif1VQas10DXIYWk/giphy.gif',
                    sound: {
                        basePath: 'https://ttsmp3.com/created_mp3/',
                        mp3: res.data.MP3
                    }
                });
            })
        }
        if(tags['custom-reward-id'] == 'f6dc5998-8896-40de-9d92-118526c31c5c'){
            tts(message, 'Vitoria')
            .then((res) => {
                this.alertQueue({
                    author: tags.username, 
                    message: message, 
                    // image: 'https://media.giphy.com/media/3orif1VQas10DXIYWk/giphy.gif',
                    sound: {
                        basePath: 'https://ttsmp3.com/created_mp3/',
                        mp3: res.data.MP3
                    }
                });
            })
        }
        if(message.toLowerCase() === '!hello') {
            client.say(channel, `@${tags.username}, heya!`);
        }
    }
}

module.exports = CreateBot;

