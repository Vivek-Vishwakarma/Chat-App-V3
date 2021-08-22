const socket = io('http://localhost:8000')

const form = document.querySelector('.send-box')
const inp = document.querySelector('.input')
const msg = document.querySelector('.message-box')

const name = prompt("Enter name : ")
append('You Joined', 'middle')
socket.emit('newUser',name)

socket.on('chat-message', data =>{
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('newUserJoined', name =>{
    append(`A wild ${name} has arrived`, 'middle')
})

socket.on('disconnected', name =>{
    append(`${name} has left the chat`,'middle')
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const message = inp.value
    append(`You: ${message}`,'right')
    socket.emit('send-message',message)
    inp.value = ''

})

function append(message, position){
    const element = document.createElement('p')
    element.innerHTML = message
    element.classList.add(position);
    element.classList.add('inner')
    msg.append(element)
}