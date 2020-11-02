// Event listeners and emitters for socket.io backend are registrated here
let io;
let gameSocket;
let activeSockets = [];
//First player
let firstPlayerUsername;

//Sets up all the socket event listeners
const initGame = (sIo, socket) => {
  // Set global variables
  io = sIo;
  gameSocket = socket;

  // Pushes the current socket to an array which stores all the active sockets.
  activeSockets.push(gameSocket);

  // User creates new game room after clicking on new multigame on homepage
  gameSocket.on('createNewGame', createNewGame);

  // User adds an username after clicking on start button on start game modal
  gameSocket.on('addUserName', addUserName);

  // Player joins gameRoom after going to a URL with '/game/:gameId' and enter username
  gameSocket.on('playerJoinsGame', playerJoinsGame);
};

const createNewGame = (gameId) => {
  // Return the game ID and the socket ID to the browser client
  io.emit('newGameCreated', { gameId, socketId: gameSocket.id });
  console.log('A new game is created: ', { gameId, socketId: gameSocket.id });

  // Join the Room and wait for the other player
  gameSocket.join(gameId);
};

const addUserName = (username) => {
  // Return the username to the browser client
  io.emit('playerOneJoinedRoom', username);
  console.log(`${username} is now connected and ready to play`);
  firstPlayerUsername = username;
};

// Joins the given socket to a session with it's gameId
const playerJoinsGame = (userData) => {
  // Look up the room ID in the Socket.IO manager object.
  let gameRoom = io.sockets.adapter.rooms[userData.gameId];
  console.log(`${userData.username} tries to join: `, { gameRoom });

  //Check if the room exists...
  if (gameRoom === undefined) {
    io.emit(
      'undefined',
      'It seems like this game session does no longer exist.'
    );
    console.log('gameRoom is undefined');
    return;
  }
  if (gameRoom.length < 2) {
    // attach the socket id to the userData object.
    userData.mySocketId = gameSocket.id;

    // Join the gameRoom
    gameSocket.join(userData.gameId);

    // Emit an event notifying the clients that the player has joined the room.
    io.sockets.in(userData.gameId).emit('playerTwoJoinedRoom', userData);

    console.log(`${userData.username} joined successfully`);

    if (gameRoom.length === 2) {
      io.sockets
        .in(userData.gameId)
        .emit('startGame', firstPlayerUsername, userData.username);
      console.log('Let the game begin...');
    }
  } else {
    // Otherwise, send an error message back to the player.
    io.emit(
      'toManyPlayers',
      'There are already two people playing in this room.'
    );
    console.log('There are already two people playing in this room.');
  }
};

exports.initGame = initGame;
