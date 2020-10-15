require('dotenv').config()
const tmi = require('tmi.js');

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
            this.alertQueue({author: tags.username, message: message});
        }
        if(message.toLowerCase() === '!hello') {
            client.say(channel, `@${tags.username}, heya!`);
        }
    }
}

module.exports = CreateBot;

