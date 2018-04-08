var express = require('express');
var socket = require('socket.io');
var app = express();

server = app.listen(8080, function () {
    console.log("server is running at port 8080");
});

io = socket(server);
io.on('connection', socket => {
    console.log(socket.id);

    io.emit("server-send-list-user", socket.id);
    socket.on('disconnect',function(){
        console.log(socket.id +"disconnect");
        io.emit("server-send-user-logout",socket.id);
    })

    socket.on("SEND_MESSAGE", function (data) {
        io.emit("RECEIVE_MESSAGE", data);
    })
})
