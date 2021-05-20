const http = require('http');

const server = http.createServer((req, res)=> {
    if(req.url === '/') {
        res.write('Henlloooooooooo');
        res.end();
    }
});

server.on('connection',(socket) => {
    console.log("new connection bhai");
});

server.listen(3000);
console.log('listenin on port 3000');