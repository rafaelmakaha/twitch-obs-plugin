const tmi = require('tmi.js');
const tts = require('../utils/tts');
const path = require('path');
const fs = require('fs');

class CreateBot {
    constructor(alertQueue) {
        this.alertQueue = alertQueue;
        this.channelName = '';
        this.configureRewards();
        this.startClient();
    }

    startClient = () => {
        this.client = new tmi.Client({
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true
            },
            channels: [ this.channelName ]
        });
        this.client.connect();
        this.client.on('message', this.message);
    }

    configureRewards = () => {
        const settings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'settings.json')));
        const rewards = {
            tts: ({ id, voice }) => ({
                id,
                rewardFn: tts,
                fnParamns: [voice],
                fnHandler: this.ttsHandler
            })
        }
        this.rewardsConfig = settings.rewards.map((reward) => (
            rewards[reward.type](reward)
        ))
        const {channelName} = this
        this.channelName = settings.channel
        if ((this.channelName !== channelName) && channelName) {
            this.startClient();
        }

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

        this.rewardsConfig.forEach((reward) => {
            if(tags['custom-reward-id'] === reward.id)
                reward.rewardFn(message, ...reward.fnParamns).then((response) => reward.fnHandler({author: tags.username, message}, response));
        })
    }
}

module.exports = CreateBot;
