const express = require("express");
const app = express();
const io = require("socket.io");
const path = require('path');

const PORT = process.env.PORT || 3000;

// GET
app.use(express.static(path.join(__dirname, 'public')));


// LISTEN
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
