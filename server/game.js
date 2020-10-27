// Event listeners and emitters for socket.io are registrated here
let io;
let gameSocket;

//initGame sets up all the socket event listeners
const initGame = (sio, socket) => {
  // initialize global variables
  io = sio;
  gameSocket = socket;

  // User creates new game room after clicking on start new game on frontend
  gameSocket.on('createNewGame', createNewGame);
};

const createNewGame = (gameId) => {
  // Return the game ID and the socket ID to the browser client
  io.emit('createNewGame', { gameId, socketId: gameSocket.id });
  console.log({ gameId, socketId: gameSocket.id });
};

exports.initGame = initGame;
