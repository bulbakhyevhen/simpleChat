const chatArea = document.getElementById('chatArea');
const messageField = document.getElementById('message');
const chatSubmit = document.getElementById('submit');

chat.on('server message', data => {

    printMessage(data);
});

function printMessage(message){
    const li = document.createElement('li');
    li.classList.add('collection-item');

    li.innerHTML = `${message.room} - ${message.message}`;

    chatArea.appendChild(li);
}

chatSubmit.addEventListener('click', (event) => {
    event.preventDefault();

    chat.emit('client message', {message : messageField.value, room : roomStatus.innerHTML});

    messageField.value = '';
});