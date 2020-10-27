import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Letters from "./components/letters/Letters"

//Connect to backend url
const socket = io.connect('/');

function App() {
  return (
    <div className="App">
      <h1>Hangman game</h1>
      <Letters></Letters>
    </div>
  );
}
export default App;
