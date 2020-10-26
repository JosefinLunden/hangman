//Initialize and export socket client so that the other components can use it
import io from 'socket.io-client';

//Connect to backend url
const socket = io.connect('/');
let socketId;

//Update socketId from backend
socket.on('createNewGame', (update) => {
  socketId = update.socketId;
  console.log(socketId);
});

export { socket, socketId };
