// Event listeners and emitters for socket.io backend are registrated here
const getWord = require('./getWord');

//Global variables
let io;
let socket;
let activeSockets = [];

//Creator
let creatorUsername;

//Sets up all the socket event listeners
const initGame = (inputIo, inputSocket) => {
  // Set global variables
  io = inputIo;
  socket = inputSocket;

  // Pushes the current socket to an array which stores all the active sockets.
  activeSockets.push(socket);

  // User creates new game room after clicking on new multigame on homepage
  socket.on('createNewGame', createNewGame);

  // User adds an username after clicking on start button on start game modal
  socket.on('addUserName', addUserName);

  // Player joins gameRoom after going to a URL with '/game/:gameId' and enter username
  socket.on('playerJoinsGame', playerJoinsGame);
};

const createNewGame = (gameId) => {
  // Return the game ID and the socket ID to the browser client
  io.emit('newGameCreated', gameId);
  console.log('A new game is created: ', { gameId, creatorId: socket.id });

  // Join the Room and wait for the other player
  socket.join(gameId);
};

const addUserName = (username) => {
  // Return the username to the browser client
  io.emit('playerOneJoinedRoom', username);
  console.log(`${username} is now connected and ready to play`);
  creatorUsername = username;
};

// Joins the given socket to a session with it's gameId
const playerJoinsGame = async (userData) => {
  // Look up the room ID in the Socket.IO manager object.
  let gameRoom = io.sockets.adapter.rooms[userData.gameId];
  console.log(`${userData.username} tries to join: `, { gameRoom });

  //Check if the room exists...
  if (gameRoom === undefined) {
    io.emit('undefined');
    console.log('gameRoom is undefined');
    return;
  }
  if (gameRoom.length < 2) {
    //Get word from api
    let data = await getWord();

    // attach the socket id to the userData object.
    userData.mySocketId = socket.id;

    // Join the gameRoom
    socket.join(userData.gameId);

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(userData.gameId).emit('playerTwoJoinedRoom', userData);
    // socket.emit('playerTwoJoinedRoom', userData);

    console.log(data);
    console.log(`${userData.username} joined successfully`);

    if (gameRoom.length === 2) {
      io.sockets
        .in(userData.gameId)
        .emit('startGame', creatorUsername, userData.username);

      io.sockets.in(userData.gameId).emit('renderWordLength', data.charsArray);

      console.log('Let the game begin...');
    }
  } else {
    // Otherwise, send an error message back to the player.
    io.emit('tooManyPlayers', userData.userId);
  }
};

exports.initGame = initGame;
