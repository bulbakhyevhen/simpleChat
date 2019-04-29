const db = require('./storage/roomList.js');

module.exports = (server) => {
    const io = require('socket.io').listen(server);
    const chat = io.of('/chat');

    chat.on('connection', (socket) => {

        socket.on('client message', (data) => {

            chat.in(data.room).emit('server message', data);

        });

        socket.on('create room', room => {

            if(db.has(room) == false){
                db.add(room);

                chat.emit('room created', room);
            }
            else {
                 socket.emit('room already exist', room);
            }

        }
        );

        socket.on('join room', room => {

            socket.leaveAll();
            socket.join(room);

            socket.emit('joined to room', room);

        });

    });
}