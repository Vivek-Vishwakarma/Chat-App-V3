const io = require('socket.io')(8000,{
    cors: {
      origin: "*",
    },
  });

const users = {}

io.on('connection', socket =>{

    socket.on('newUser',name=>{
        users[socket.id] = name
        socket.broadcast.emit('newUserJoined',name)
    })

    socket.on('send-message', message =>{
        
        socket.broadcast.emit('chat-message', {message : message, name : users[socket.id]})
    })
    socket.on('disconnect', () =>{
        socket.broadcast.emit('disconnected', users[socket.id])
        delete users[socket.id]
    })
})