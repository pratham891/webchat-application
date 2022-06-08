// jshint esversion:6

const path = require('path');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;


const users = {};

// GET
app.use(express.static(path.join(__dirname, 'public')));



// socket.io connection
io.on("connection", (socket) => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;

        console.log(name + " connected");

        socket.emit('self-joined', name);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('msg-sent', message => {
        socket.broadcast.emit('msg-receive', {name: users[socket.id], message: message});
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);

        console.log(users[socket.id] + " Disconnected");
        delete users[socket.id];
        console.log("updated users:");
        console.log(users);
    });
});


// LISTEN
server.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
