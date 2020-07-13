const socket = io('http://localhost:3000');
const message = document.getElementById('type-msg');
let sender_name, responder, chatmessages, par, shouldScroll;
let realchat = document.querySelector('.realchat');
let chatname = document.querySelector('.chat-scroll-view');

const getUsers = () => {
  //fetch all users here to replace this
  const details = JSON.parse(window.localStorage.getItem('tpAuth'));
  const token = details.token;
  //console.log(token);
  let users;

  axios
    .get('/v1/message/chat-users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      users = JSON.parse(JSON.stringify(res));
      getChatUsers(res);
    })
    .catch((err) => console.log(err));

  function toggleBack() {
    var x = document.getElementsByClassName('main-section');
    var messageToggle = document.getElementById('inbox-top');
    var messages = document.getElementById('right-side');

    if (window.screen.width > 768) {
      return;
    }
    for (var i = 0; i < x.length; i++) {
      if (x[i].style.display === 'none') {
        x[i].style.display = 'block';
        messageToggle.style.display = 'none';
        messages.style.display = 'none';
      } else {
        x[i].style.display = 'none';
        messageToggle.style.display = 'block';
        messages.style.display = 'block';
      }
    }
  }

  function getChatUsers(users) {
    let chatusers = users.data.data.data;
    //console.log("chat users: " + chatusers)
    let name = '';
    chatusers.map((item) => {
      if (item.employer_name) {
        name = item.employer_name;
        console.log(`employer name: ${name}`);
      } else {
        name = item.first_name + ' ' + item.last_name;
        console.log(`full name: ${name}`);
      }
      let id = item.user_id;
      console.log(`id: ${id}`);

      par = document.createElement('div');
      par.classList.add(
        'card',
        'd-flex',
        'flex-row',
        'mb-3',
        'p-3',
        'chat-card',
      );
      par.addEventListener('click', toggleBack);
      let imgdiv = document.createElement('div');
      imgdiv.classList.add('mb-1', 'img-class');
      let img = document.createElement('img');
      img.src = 'img/admin-dash-messages/Ellipse 30.png';
      img.alt = 'img';
      img.classList.add('dp-img');
      imgdiv.appendChild(img);

      let chatInfo = document.createElement('div');
      chatInfo.classList.add('chat-info');
      chatInfo.dataset.name = name;
      chatInfo.dataset.id = id;

      let contenttop = document.createElement('div');
      contenttop.classList.add(
        'content-top',
        'd-flex',
        'flex-row',
        'justify-content-between',
      );
      let contentname = document.createElement('p');
      contentname.classList.add('contact-name', 'mb-0', 'font-weight-bold');
      contentname.textContent = name;
      let contenttime = document.createElement('p');
      contenttime.classList.add('time-sent', 'mb-0');
      contenttop.appendChild(contentname);
      contenttop.appendChild(contenttime);

      let contentbottom = document.createElement('div');
      contentbottom.classList.add('content-bottom', 'd-flex', 'flex-row');
      let pc = document.createElement('p');
      pc.classList.add('mb-0', 'pr-2');
      let bimg = document.createElement('img');
      bimg.src = 'img/admin-dash-messages/Read-tick.svg';
      bimg.classList.add('check-mark');
      bimg.alt = 'dp-img/';
      pc.appendChild(bimg);
      contentbottom.appendChild(pc);

      chatInfo.appendChild(contenttop);
      chatInfo.appendChild(contentbottom);

      par.appendChild(imgdiv);
      par.appendChild(chatInfo);

      chatname.appendChild(par);
      //console.log(`chat name inside the map: ${chatname}`)
      //getAllMessages();
    });
    getAllMessages();
    console.log(chatname);
  }
};

getUsers();

function getAllMessages() {
  let chatlist = document.querySelectorAll('.chat-info');
  chatlist = Array.from(chatlist);
  let receiverId = window.document.querySelector('.chat-info').dataset.id;
  //console.log("receiver id" + receiverId);

  chatlist.map((item) => {
    item.addEventListener('click', () => {
      receiverId = item.dataset.id;
      sender_name = item.dataset.name;
      realchat.innerHTML = '';
      //fetch previous chat messages
      const details = JSON.parse(window.localStorage.getItem('tpAuth'));
      const token = details.token;
      const senderId = details.userId;
      console.log('sender id: ' + senderId);
      console.log('receiver id: ' + receiverId);
      console.log('token: ' + token);

      axios
        .get(`/v1/message/${senderId}/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          res.data.data.forEach((sth) => {
            console.log(`get messages between users`);
            console.log(`data in get messages api ${res}`);
            showOutput(sth);
            let message = sth.message;
            console.log('message: ' + message);
            let receiverId = sth.receiver_id;
            let userIid = sth.user_id;
          });
        })
        .catch((err) => console.log(err));
    });
  });
}

const connect = () => {
  // get user_id from localstorage to replace this id
  const details = JSON.parse(window.localStorage.getItem('tpAuth'));
  responder = details.userId;
  console.log(`responder: ${responder}`);
  // send it to server
  socket.emit('user_connected', responder);
  //save my name in global variable
  // prevent the form from submitting
  return false;
};

connect();

const sendMessage = () => {
  // get message
  if (event.keyCode === 13) {
    const text = message.value;

    chatmessages = document.querySelector('.chat-messages');

    let respond = document.createElement('div');
    let chatcontainer = document.createElement('div');
    let chatrespond = document.createElement('div');
    let flipod = document.createElement('div');
    let chatmsg = document.createElement('div');
    let time = document.createElement('div');
    let span = document.createElement('span');
    let sent = document.createElement('span');
    let img = document.createElement('img');

    time.classList.add('time');
    span.textContent = '11:46 AM';
    time.appendChild(span);
    img.src = 'img/admin-dash-messages/sent.svg';
    img.alt = 'delivered';
    sent.classList.add('sent');
    sent.appendChild(img);
    time.appendChild(sent);
    flipod.classList.add('flippd');
    chatmsg.classList.add('chatmsg');
    chatmsg.textContent = text;
    flipod.appendChild(chatmsg);
    chatrespond.classList.add('chat-respond', 'msg');
    chatrespond.appendChild(flipod);
    chatcontainer.classList.add('chat-container', 'respond');
    chatcontainer.appendChild(chatrespond);
    respond.classList.add('respond');
    respond.appendChild(chatcontainer);
    respond.appendChild(time);

    realchat.appendChild(respond);
    shouldScroll =
      chatmessages.scrollTop + chatmessages.clientHeight ===
      chatmessages.scrollHeight;
    console.log(chatmessages.scrollTop, shouldScroll);
    message.value = '';
    if (!shouldScroll) {
      chatmessages.scrollTop = chatmessages.scrollHeight;
    }

    // send message to server
    socket.emit('send_message', {
      sender: responder, //you should check this, it throws an error
      receiver: sender,
      message: text,
      read_status: false,
      sender_name: 'Esther',
    });
  }
};

message.addEventListener('keyup', sendMessage);

socket.on('new_message', function (data) {
  console.log(data);
  if (data.receiver !== responder || data.sender !== sender) {
    return;
  }
  let sender1 = document.createElement('div');
  let chatcontainer = document.createElement('div');
  let chatsender = document.createElement('div');
  let chatmsg = document.createElement('div');
  let time = document.createElement('div');
  let span = document.createElement('span');
  realchat = document.querySelector('.realchat');
  chatmessages = document.querySelector('.chat-messages');

  span.textContent = '11:46 AM';
  time.classList.add('time');
  time.appendChild(span);
  chatmsg.classList.add('chatmsg');
  chatmsg.textContent = data.message;
  chatsender.classList.add('chat-sender', 'msg');
  chatsender.appendChild(chatmsg);
  chatcontainer.classList.add('chat-container');
  chatcontainer.appendChild(chatsender);
  sender1.classList.add('sender');
  sender1.appendChild(chatcontainer);
  sender1.appendChild(time);

  if (data.sender === responder) {
    return;
  }
  realchat.appendChild(sender1);
  shouldScroll =
    chatmessages.scrollTop + chatmessages.clientHeight ===
    chatmessages.scrollHeight;
  console.log(chatmessages.scrollTop, shouldScroll);
  message.value = '';
  if (!shouldScroll) {
    chatmessages.scrollTop = chatmessages.scrollHeight;
  }
});
