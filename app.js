const express  = require('express');
const app    = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const port = process.env.port || 80;

server.listen(port);

app.use(express.static('public'));

app.get('/server', function(req, res){
    res.sendFile(__dirname + '/server.html')
})

app.get('/client', function(req, res){
    res.sendFile(__dirname + '/client.html')
})


io.on('connection', (socket) => {
    socket.on('move', (msg) => {
        io.emit('move', msg);
    });
    socket.on('click', (msg) => {
        io.emit('click', msg);
    });
    
    
    
    socket.on('input', (msg) => {
        socket.broadcast.emit('input', msg);
    });
    
    
    
    
    
});