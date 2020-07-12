const getMessage = document.getElementById('msg--wrap')
const chatList = document.getElementById('chat--list')
const chatItem = document.getElementById('chat-item')
const chatItem2 = document.getElementById('chat-item-2')
const chatItem3 = document.getElementById('chat-item-3')
const chatItem4 = document.getElementById('chat-item-4')
const chatItem5 = document.getElementById('chat-item-5')
const chatListBack = document.getElementById('chat--list-back')

chatItem.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
    } else if (screen.width > 991) {
        document.querySelector('.msg-pic').src = '../img/chat-img-1.png'
        document.querySelector('.msg-name').innerHTML = 'Tomisin Lalude'
        document.querySelector('.chat-bubble-1').innerHTML = `If you intend to seek financial support from an investor,
        a traditional business plan is a must.`
        document.querySelector('.chat-bubble-2').innerHTML = `Very correct.`
        document.querySelector('.chat-bubble-3').innerHTML = `Thank you.`
        document.querySelector('.chat-bubble-4').innerHTML = `Will you be at the conference?`
    }
})

chatItem2.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
        document.querySelector('.msg-pic').src = '../img/chat-img-2.png'
        document.querySelector('.msg-name').innerHTML = 'Nifemi Ajayi'
        document.querySelector('.chat-bubble-1').innerHTML = 'I hope you are ready for the internship?'
        document.querySelector('.chat-bubble-2').innerHTML = 'Yes I am'
        document.querySelector('.chat-bubble-3').innerHTML = `That's great to hear`
        document.querySelector('.chat-bubble-4').innerHTML = `Thank you`
    } else if (screen.width > 991) {
        document.querySelector('.msg-pic').src = '../img/chat-img-2.png'
        document.querySelector('.msg-name').innerHTML = 'Nifemi Ajayi'
        document.querySelector('.chat-bubble-1').innerHTML = 'I hope you are ready for the internship?'
        document.querySelector('.chat-bubble-2').innerHTML = 'Yes I am'
        document.querySelector('.chat-bubble-3').innerHTML = `That's great to hear`
        document.querySelector('.chat-bubble-4').innerHTML = `Thank you`
    }
})
chatItem3.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
        document.querySelector('.msg-pic').src = '../img/chat-img-3.png'
        document.querySelector('.msg-name').innerHTML = 'Julia Orji'
        document.querySelector('.chat-bubble-1').innerHTML = 'Designing a mind blowing product is what i expect from you.'
        document.querySelector('.chat-bubble-2').innerHTML = 'Yes I am'
        document.querySelector('.chat-bubble-3').innerHTML = `So you're putting in nothing short of your best`
        document.querySelector('.chat-bubble-4').innerHTML = `Of course`
    } else if (screen.width > 991) {
        document.querySelector('.msg-pic').src = '../img/chat-img-3.png'
        document.querySelector('.msg-name').innerHTML = 'Julia Orji'
        document.querySelector('.chat-bubble-1').innerHTML = 'Designing a mind blowing product is what i expect from you.'
        document.querySelector('.chat-bubble-2').innerHTML = 'Yes I am'
        document.querySelector('.chat-bubble-3').innerHTML = `So you're putting in nothing short of your best`
        document.querySelector('.chat-bubble-4').innerHTML = `Of course`
    }
})
chatItem4.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
        document.querySelector('.msg-pic').src = '../img/chat-img-4.png'
        document.querySelector('.msg-name').innerHTML = 'Ayo Shittu'
        document.querySelector('.chat-bubble-1').innerHTML = 'I just went through your portfolio.'
        document.querySelector('.chat-bubble-2').innerHTML = 'Ok.'
        document.querySelector('.chat-bubble-3').innerHTML = `And I like what i see`
        document.querySelector('.chat-bubble-4').innerHTML = `Thank you`
    } else if (screen.width > 991) {
        document.querySelector('.msg-pic').src = '../img/chat-img-4.png'
        document.querySelector('.msg-name').innerHTML = 'Ayo Shittu'
        document.querySelector('.chat-bubble-1').innerHTML = 'I just went through your portfolio.'
        document.querySelector('.chat-bubble-2').innerHTML = 'Ok.'
        document.querySelector('.chat-bubble-3').innerHTML = `And I like what i see`
        document.querySelector('.chat-bubble-4').innerHTML = `Thank you`
    }
})
chatItem5.addEventListener('click', () => {
    if (screen.width <= 991) {
        chatList.style.display = 'none'
        getMessage.classList.add('msg--wrap-enter')
        document.querySelector('.msg-pic').src = '../img/chat-img-5.png'
        document.querySelector('.msg-name').innerHTML = 'Abiodun Popoola'
        document.querySelector('.chat-bubble-1').innerHTML = 'Lorem ipsum dolor is not good enough for mockup text.'
        document.querySelector('.chat-bubble-2').innerHTML = `But it's popular`
        document.querySelector('.chat-bubble-3').innerHTML = `That's the point`
        document.querySelector('.chat-bubble-4').innerHTML = `I understand Sir`
    } else if (screen.width > 991) {
        document.querySelector('.msg-pic').src = '../img/chat-img-5.png'
        document.querySelector('.msg-name').innerHTML = 'Abiodun Popoola'
        document.querySelector('.chat-bubble-1').innerHTML = 'Lorem ipsum dolor is not good enough for mockup text.'
        document.querySelector('.chat-bubble-2').innerHTML = `But it's popular`
        document.querySelector('.chat-bubble-3').innerHTML = `That's the point`
        document.querySelector('.chat-bubble-4').innerHTML = `I understand Sir`
    }
})

chatListBack.addEventListener('click', () => {
    getMessage.classList.remove('msg--wrap-enter')
    chatList.style.display = 'block'
    document.querySelector('.msg-pic').src = '../img/chat-img-1.png'
    document.querySelector('.msg-name').innerHTML = 'Tomisin Lalude'
    document.querySelector('.chat-bubble-1').innerHTML = `If you intend to seek financial support from an investor,
    a tradxitional business plan is a must.`
    document.querySelector('.chat-bubble-2').innerHTML = `Very correct.`
    document.querySelector('.chat-bubble-3').innerHTML = `Thank you.`
    document.querySelector('.chat-bubble-4').innerHTML = `Will you be at the conference?`

})