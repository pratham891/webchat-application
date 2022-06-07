// jshint esversion:6

const path = require('path');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


const users = {};

// GET
app.use(express.static(path.join(__dirname, 'public')));



// socket.io connection
io.on("connection", (socket) => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(users);
    });
});


// LISTEN
server.listen("3000", () => {
    console.log("Server is running on port 3000");
});
