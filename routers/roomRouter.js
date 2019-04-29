const express = require('express');

const roomRouter = express.Router();
const db = require('../storage/roomList.js');

roomRouter.get('/', (req, res) => {
    res.render('chat', {db : db});
});

module.exports = roomRouter;