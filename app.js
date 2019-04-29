const express = require('express');
const Routers = require('./routers');
const app = express();

const webSocketServer = require('./sockets.js');
const server = app.listen(3000);

webSocketServer(server);

app.use(express.static('public'));
app.set("view engine", "ejs");

Routers(app);


