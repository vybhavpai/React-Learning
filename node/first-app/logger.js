const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter{
    log(message) {
        console.log(message);
        this.emit('message logged', { id : 69, url: "https://localhost:3000"});
    }
}

module.exports = Logger;
