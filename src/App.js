import React from 'react';
import './App.css';
import io from 'socket.io-client';

//Connect to backend url
const socket = io.connect('/');

function App() {
  return (
    <div className="App">
      <h1>Hangman game</h1>
    </div>
  );
}
export default App;
