console.log("The Client JS is Working Fine");
const socket = io('http://localhost:8000');

var audio = new Audio('ding.mp3');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=='left') {
        audio.play();        
    } 
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    //Using above line, the page wont reload again
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
const nameidhu = prompt("Enter Your Name: ");
socket.emit('new-user-joined', nameidhu);

socket.on('user-joined', name =>{
    append(`${name} joined the Chat`, 'right');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name =>{
    append(`${name} left the Chat`, 'left');
})