var socket = io();
const chatDisplay = document.querySelector("#chat-display");
const container = document.querySelector("#container");
const form = document.querySelector("#send-msg");
const input = document.querySelector("#input");
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

form.addEventListener('submit', function (e) {
    e.preventDefault();

    socket.emit('msg-sent', input.value);
    
    let newSelfMsg = document.createElement("div");
    newSelfMsg.classList.add("msgs");
    newSelfMsg.classList.add("self");
    chatDisplay.appendChild(newSelfMsg);
    
    let pInNewSelfMsg = document.createElement("p");
    pInNewSelfMsg.textContent = input.value;
    newSelfMsg.appendChild(pInNewSelfMsg);
    
    input.value = "";
});

socket.on('msg-receive', data => {
    let newMsg = document.createElement("div");
    newMsg.classList.add("msgs");
    newMsg.classList.add("other");
    chatDisplay.appendChild(newMsg);

    let pInNewMsg = document.createElement("p");
    pInNewMsg.textContent = data.message;
    newMsg.appendChild(pInNewMsg);
});
