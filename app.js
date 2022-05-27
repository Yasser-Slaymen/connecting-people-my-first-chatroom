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

// render index
app.get('/', (request, response) =>{
    response.render('pages/index')
})


http.listen(PORT, () =>{
    console.log(`applistening on port ${PORT}`)
})