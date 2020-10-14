require('dotenv').config()
const tmi = require('tmi.js');

class CreateBot {
    constructor(socketEmit) {
        this.socketEmit = socketEmit;
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
    socket = (dados) => {
        if(typeof this.socketEmit === typeof Function)
            this.socketEmit('emitX', dados);
    }
    message = (channel, tags, message, self) => {
        // Ignore echoed messages.
        if(self) return;
        if(tags['custom-reward-id'] == 'bd97e0e9-7b68-46d9-ae6e-03d817bcda82'){
            this.socket(`@${tags.username}: ${message}`);
        }
        if(message.toLowerCase() === '!hello') {
            // "@alca, heya!"
            client.say(channel, `@${tags.username}, heya!`);
        }
    }
}

module.exports = CreateBot;

