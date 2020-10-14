require('dotenv').config()
const tmi = require('tmi.js');
const AWS = require('aws-sdk');
const fs = require('fs');

const client = new tmi.Client({
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

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
    if(self) return;
    // for(var key in tags){
    //     console.log(key);
    // }
    // console.log(tags);
    if(tags['custom-reward-id'] == 'bd97e0e9-7b68-46d9-ae6e-03d817bcda82'){
        console.log(tags.username);
        console.log("é um tts");
        console.log(message);
    }
	if(message.toLowerCase() === '!hello') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, heya!`);
	}
});