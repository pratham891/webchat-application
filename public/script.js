var socket = io();
const chatDisplay = document.querySelector(".chat-display");


const name = prompt("Your name");

socket.emit('new-user-joined', name);

