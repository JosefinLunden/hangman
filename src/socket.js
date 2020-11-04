//Initialize and export socket client so that the other components can use it
import io from 'socket.io-client';

//Connect to backend url
const socket = io.connect('/');

export { socket };
