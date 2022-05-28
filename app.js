// const { name } = require('ejs')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = process.env.PORT || 5000


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
 
        // welcome current user in console
        socket.emit('message', 'welcome to chat')
        socket.on('new-user', (name) => {
              users[socket.id] = name
              // Broadcast when a user connects
              socket.broadcast.emit('user-connected', name)
        })

        // Listen for send message
        socket.on('send-chat-message', (message) => {
          socket.broadcast.emit('chat-message', {
                message: message,
                name: users[socket.id],
          })
        })

        // Runs when users disconnects
        socket.on('disconnect', () => {
          // Bye message in console
          io.emit('message','user has left the chat')

          socket.broadcast.emit('user-disconnected', users[socket.id])
          delete users[socket.id]
        })
})

http.listen(PORT, () =>{
    console.log(`applistening on port ${PORT}`)
})