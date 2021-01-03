class MessagesQueue {
    constructor(socketEmit) {
        this.socketEmit = socketEmit;
        this.__free = true;
        this.__queue = [];
    }

    free = (free) => {
        console.log('free: ', free)
        this.__free = free;
        this.sendToFront();
    }

    queue = (data) => {
        this.__queue.push(data);
        this.sendToFront();
    }
    
    sendToFront = () => {
        if(this.__free && this.__queue.length){
            this.__free = false;
            const message = this.__queue.shift();
            console.log('message sending:', message);
            this.socketEmit('showMessage', message);
        }
    }
}

module.exports = MessagesQueue;