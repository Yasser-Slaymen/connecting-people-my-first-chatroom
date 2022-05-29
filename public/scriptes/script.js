
let socket = io()
let messagesContainer = document.querySelector('section ul')
let input = document.querySelector('input')
let form = document.querySelector('form')
let message = document.querySelector('li')
let name= prompt('voeg je naam')


// Welcom & bye consol message
socket.on('message',message =>{
    console.log(message)
})


// Eevntlistener
form.addEventListener('submit', e => {
    e.preventDefault()
    // Get message text
    const message = input.value
    appendMessage(`You : ${message}`)
    // Emit message to server
    socket.emit('send-chat-message', message)
    input.value = ''
    
})
appendMessage('You joined to chat')

// Socket functions
socket.emit('new-user',name)

socket.on('chat-message',(data) => {
    receivedMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected',(name) =>{
    appendMessage(`${name} connected`)
})

socket.on('user-diconnected', (data) =>{
    appendMessage(`${name} disconnected`)
})





// functions

function appendMessage(message) {
    let messageEL = document.createElement('li')
    messageEL.classList.add('sent')
    messageEL.innerText =  message
   
    messagesContainer.append(messageEL)

}

function receivedMessage(message) {
    let receivedMessageEl = document.createElement('li')
    receivedMessageEl.classList.add('received')
    receivedMessageEl.innerText = message
    messagesContainer.append(receivedMessageEl)
  }




