const socket = io()
let ul = document.querySelector('.chat-messages')
let form = document.querySelector('form')
const users = prompt("what's your nickname?") || randomStr()


// Message from server 
socket.on('message', message => {
    console.log(message)
    outputMessage(message)
    
    // Scroll down
    // ul.scrollTop = ul.scrollHeight
    ul.scrollTo(0, ul.scrollHeight)


    // test username
    socket.emit("register users", users)



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
    const divm = document.createElement('li')
    divm.classList.add('message')
    divm.innerHTML = `
    <p class="meta">
    ${message.username}<span>${message.time}</span> </p>
    <p class="text">
    ${message.text}
    </p>
    <span>${users}</span>
    `
    ul.appendChild(divm)
    
}

// Get username from URL
// const {username,rooms} = qs.parse(location.search, {
//     ignoreQueryPrefix: true
// })
//  console.log(username)




































// // Eevntlistener
// Form.addEventListener('submit', e => {
//     e.preventDefault()
//     if(input.value === ''){
//         socket.emit('message',messageInput.value)
//         messageInput.value =''
//     }
// })

// let typing = false
// input.addEventListener('keyup', () =>{
//     if(!typing && input.value !==''){
//         typing = true
//         socket.emit('start-typing')
//     } else if (typing && input.value ===''){
//         typing = false
//         socket.emit('stop-typing')
//     }
// })
