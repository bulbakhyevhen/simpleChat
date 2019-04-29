const roomList = document.getElementById('room-list');
const nameField = document.getElementById('Room_name')
const createRommSubmit = document.getElementById('add-room');

const roomStatus = document.getElementById('room-status').children[1];

chat.on('room already exist', room => {
    alert(`${room} already exist`);
});

chat.on('connect_failed', () => {
    alert('Connection lost...');
});

chat.on('disconect', () => {
    changeRoomStatus('Disconected');
});

chat.on('joined to room', room => {
    changeRoomStatus(room);
});

chat.on('room created', room => {

    if(room !== ''){
        printRoom(room);
    }

});

function changeRoomStatus(roomName){
    roomStatus.innerHTML = roomName;
}

function printRoom(room){
    
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.classList.add('waves-effect');
    button.classList.add('waves-light');
    button.classList.add('btn-small');
    button.classList.add('right');
    button.id = 'join-room';
    button.innerHTML = 'join';

    li.classList.add('collection-item'); 
    li.innerHTML = room;

    button.addEventListener('click', event => { 
        event.preventDefault();

        chat.emit('join room', room);
    });

    roomList.appendChild(li);
    li.appendChild(button);

}

function sendRoomData(room){
    chat.emit('create room', room);
}

createRommSubmit.addEventListener('click', event =>{
    event.preventDefault();

    sendRoomData(nameField.value);

    nameField.value = '';
});

for(let i = 1; i < roomList.childElementCount; i++){
    roomList.children[i].children[0].addEventListener('click', event => {
        chat.emit('join room', roomList.children[i].children[0].value);
    })
}