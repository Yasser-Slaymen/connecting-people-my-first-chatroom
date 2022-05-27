let socket = io()
let messages = document.querySelector('.messages')
let input = document.querySelector('.message__input')
let Form = document.querySelector('.send__container')


// Eevntlistener
Form.addEventListener('submit', e => {
    e.preventDefault()
    if(input.value === ''){
        socket.emit('message',messageInput.value)
        messageInput.value =''
    }
})

let typing = false
input.addEventListener('keyup', () =>{
    if(!typing && input.value !==''){
        typing = true
        socketemit('start-typing')
    } else if (typing && input.value ===''){
        typing = false
        socket.emit('stop-typing')
    }
})
