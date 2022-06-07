var socket = io();
const chatDisplay = document.querySelector("#chat-display");
const container = document.querySelector("#container");

const msgs = document.querySelector(".msgs");


let name = prompt("Your name");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    let newNotif = document.createElement("div");
    newNotif.classList.add("msgs");
    newNotif.classList.add("updates");
    chatDisplay.appendChild(newNotif);

    let pInNotif = document.createElement("p");
    pInNotif.innerHTML = name + " joined";
    newNotif.appendChild(pInNotif);
});

