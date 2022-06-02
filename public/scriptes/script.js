const socket = io()
let ul = document.querySelector('.chat-messages')
let form = document.querySelector('form')
// const users = prompt("what's your nickname?") || randomStr()

// test username
// socket.emit("register users", users)

// Message from server 
socket.on('message', message => {
    // console.log(message)
    outputMessage(message)
    
    // Scroll down
    // ul.scrollTop = ul.scrollHeight
    ul.scrollTo(0, ul.scrollHeight)

})

// Message sumite
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = e.target.elements.msg.value;
    // console.log(msg)

    // Emit message to server
    socket.emit('ChatMessage',msg )
    // Clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

// Outputmeessage to Dom
function  outputMessage(message) {
    const messageContainer = document.createElement('li')
    messageContainer.classList.add('message')
    messageContainer.innerHTML = `
    
    <p class="meta">
    ${message.username} </p>
    <p class="text">
    ${message.text}
    </p>

    <span class="span_time">${message.time}</span> 
    `
    ul.appendChild(messageContainer)
    
}

/* <p><span class="span_name">${users}</span></p> */






































