const { uuid } = require('uuidv4');
const chalk = require('chalk');
const app = require('./app');
const model = require('./Models');

// normalizePort function returns a valid port, whether it is provided as a number or a string
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};
// normalize and set the port
const port = normalizePort(process.env.PORT || '3000');

// create a http server
const server = app.listen(port, () => {
  const address = server.address();
  const bind = typeof host === 'string' ? `pipe ${address}` : `port: ${port}`;
  const log = `${chalk.yellow('[?]')} ${chalk.green('Checking super admin is seeded...')}`;
  // eslint-disable-next-line no-console
  console.log(`listening on ${bind}`);
  // eslint-disable-next-line no-console
  console.log(log);
});

// eslint-disable-next-line import/order
const io = require('socket.io')(server, {
  origins: '*:*',
});

const users = [];
const room = uuid();
io.on('connection', (socket) => {
  // attach incoming listener for new user
  socket.on('user_connected', (username) => {
    // save in array
    users[username] = socket.id;
    // join room
    socket.join(room);
    // socket ID will be used to send message to individual person

    // notify all connected clients
    io.to(room).emit('user_connected', username);
  });

  // listen from client inside IO "connection" event
  socket.on('send_message', (data) => {
    // send event to receiver
    model.Chat.create({
      message: data.message,
      read_status: data.read_status,
      receiver_id: data.receiver,
      user_id: data.sender,
    });

    io.to(room).emit('new_message', data);
  });
});
