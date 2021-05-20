const path = require('path');
var pathobj = path.parse(__filename); 

const Logger = require('./logger');
var logger = new Logger();
logger.on('message logged',(arg) =>     {
    console.log('Listener called bhai, aur object is ');
    console.log(arg);

}); 

const os = require('os');

const fs  = require('fs');
var files = fs.readdirSync('./');
fs.readdir('./', function(err, filesAsync){
    if(err)
        console.log(err);
    else
        console.log(`Result ${filesAsync}`);
});

var totalMem  = os.totalmem;
var freeMem = os.freemem;
function sayHello () {
    logger.log(`total mem: ${totalMem} and freeMem: ${freeMem}`);
    console.log(pathobj);
    logger.log(`all files : ${files}`);
}

sayHello();



