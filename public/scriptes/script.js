let socket = io()
let messagesContainer = document.querySelector('ul')
let input = document.querySelector('.message__input')
let Form = document.querySelector('.send__container')
let message = document.querySelector('li')
let username = prompt('voeg je naam')


// Eevntlistener
Form.addEventListener('submit', e => {
    e.preventDefault()
    let message = input.value
    appendMessage(`jij:${message}`)
    socket.emit(' send message', message)
    input.value = ''
    
})
appendMessage('You joined to chat')

// Socket functions
socket.emit('new-user',username)
socket.on('chat-message',(data) => {
    receivedMessage(`${data.username}: ${data.message}`)
})

socket.on('user-connected',(username) =>{
    appendMessage(`${username} connected`)
})

socket.on('user-diconnected', (data) =>{
    appendMessage(`${username} disconnected`)
})

// functions

function appendMessage(message) {
    let messageEL = document.createElement('li')
    messageEL.classList.add('sent')
    messageEL.innerText = message
    messagesContainer.append(messageEL)

}

function receivedMessage(message) {
    let receivedMessageEl = document.createElement('li')
    receivedMessageEl.classList.add('received')
    receivedMessageEl.innerText = message
    messagesContainer.append(receivedMessageEl)
  }



// let typing = false
// input.addEventListener('keyup', () =>{
//     if(!typing && input.value !==''){
//         typing = true
//         socketemit('start-typing')
//     } else if (typing && input.value ===''){
//         typing = false
//         socket.emit('stop-typing')
//     }
// })
// if(input.value === ''){
    //     socket.emit('message',messageInput.value)
    //     messageInput.value =''
    // }
