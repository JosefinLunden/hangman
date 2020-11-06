// Event listeners and emitters for socket.io backend are registrated here
const getWord = require('./getWord');
const checkLetter = require('./checkLetter');

//Global variables
let io;
let socket;
let activeSockets = [];

//Creator
let creatorUsername;

// Object returned after running getWord function
let data;

//SocketID:s
let playerOneSocketId;
let playerTwoSocketId;

//Sets up all the socket event listeners
const initGame = (inputIo, inputSocket) => {
  // Set global variables
  io = inputIo;
  socket = inputSocket;

  // Pushes the current socket to an array which stores all the active sockets.
  activeSockets.push(socket);

  // User creates new game room after clicking on new multigame on homepage
  socket.on('createNewGame', createNewGame);

  // User adds a username after clicking on start button on start game modal
  socket.on('addUserName', addUserName);

  // Player joins gameRoom after going to a URL with '/game/:gameId' and enter username
  socket.on('playerJoinsGame', playerJoinsGame);

  // Guessed letter is checked against word in backend
  socket.on('guessLetter', guessLetter);

  // Guessed letter is checked against word in backend
  socket.on('handleNoMatch', handleNoMatch);
};

const createNewGame = (gameId) => {
  // Return the game ID and the socket ID to the browser client
  io.emit('newGameCreated', gameId);
  playerOneSocketId = socket.id;
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

// const guessLetter = async (letter, word)
const guessLetter = async (letter, socketId, gameId) => {
  try {
    let match = await checkLetter(letter, data.word);

    if (socketId === playerOneSocketId) {
      io.to(playerOneSocketId).emit('letterChecked', match);
    } else {
      io.to(playerTwoSocketId).emit('letterChecked', match);
    }
  } catch (error) {
    return `Couldn't check guessed letter because ${error}`;
  }
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
    data = await getWord();

    // attach the socket id to the userData object.
    userData.mySocketId = socket.id;

    playerTwoSocketId = socket.id;

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
        .emit(
          'startGame',
          creatorUsername,
          userData.username,
          data.charsArray,
          playerOneSocketId,
          playerTwoSocketId
        );

      // io.sockets.in(userData.gameId).emit('renderWordLength', data.charsArray);
    }
  } else {
    // Otherwise, send an error message back to the player.
    io.emit('tooManyPlayers', userData.userId);
  }
};

const handleNoMatch = (gameId) => {
  console.log('Handle No Match ' + gameId);
  io.emit('handleNoMatch');
};

exports.initGame = initGame;
