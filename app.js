const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = process.env.PORT || 4000
const formatMessage = require('./uitls/messages')
const botName = 'Coding the curbsn Bot'


// statics 
app.use(express.static(path.resolve('public')))

// ejs template engine
app.set('view engine', 'ejs')
app.set('views', './views')

// render index
app.get('/', (request, response) =>{
    response.render('pages/index')
})

// Chat builde
// Run when user connects
io.on('connection', socket =>{

        // Welcome current user
        socket.emit('message',formatMessage(botName,'Welcom to chat'))

        // Broadcast when a user connects
        socket.broadcast.emit('message', formatMessage(botName,` user has joined to chat`))

        // Listen for chatmassege
        socket.on('ChatMessage',msg => {
            io.emit('message',formatMessage(``, msg))

            // console.log(msg)
            // io.emit('message',formatMessage(msg.sender, msg.value))
            // io.emit('message',formatMessage(`user`, msg))
            
        })

        // Run when user disconnects
        socket.on('disconnect', () => {
            io.emit('message',formatMessage(botName,` user has left`))
        })

        



})



http.listen(PORT, () =>{ console.log(`Server running on port ${PORT}`)})