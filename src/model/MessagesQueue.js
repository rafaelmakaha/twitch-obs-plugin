class MessagesQueue {
    constructor(socketEmit) {
        this.socketEmit = socketEmit;
        this.__free = true;
        this.__queue = [];
    }

    free = (free) => {
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
            const message = this.__queue.shift()
            this.socketEmit('showMessage', message);
        }
    }
}

module.exports = MessagesQueue;