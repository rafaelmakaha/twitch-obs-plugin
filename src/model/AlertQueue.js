const { LexModelBuildingService } = require("aws-sdk");

class AlertQueue {
    constructor(socketEmit) {
        this.socketEmit = socketEmit;
        this.__free = true;
        this.__queue = [];
    }
    free = (free) => {
        console.log(`this.free: ${this.__free}`);
        console.log(`free: ${free}`);
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
            this.socketEmit('emitX', this.__queue.shift());
        }
    }
}

module.exports = AlertQueue;