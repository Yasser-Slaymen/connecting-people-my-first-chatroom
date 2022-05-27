const { name } = require('ejs')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = process.env.PORT || 4000


// statics 
app.use(express.static(path.resolve('public')))

// ejs template engine
app.set('view engine', 'ejs')
app.set('views', './views')


// render index
app.get('/', (request, response) =>{
    response.render('pages/index')
})


const users = {}

io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id],
    })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

http.listen(PORT, () =>{
    console.log(`applistening on port ${PORT}`)
})