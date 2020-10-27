const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const game = require('./game');
const getWord = require('./getWord');

//Port from environment variable or default 8080
const port = process.env.PORT || 8080;

//Setting up express and adding socketIO middleware
const app = express();
const server = http.createServer(app);
let io = socketIO(server);

//Set static folder
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/hangman', function (req, res) {
  return res.send('Hangman Backend');
});

// Backend route to get random word from API
app.use('/api/getword', getWord);

//Enter Heroku - app routes through url
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

//Handle a socket connection request from client ---> run initGame (game.js)
io.on('connection', (socket) => {
  console.log('client connected');
  game.initGame(io, socket);
});

//Start server
server.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
