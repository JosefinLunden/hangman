import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const socket = require('../socket').socket;

const InitNewGame = () => {
  const [name, setName] = useState('');
  const [gameUrl, setGameUrl] = useState('');

  const gameId = uuidv4();
  const domainName = window.location.href;

  const createGameUrl = (e) => {
    e.preventDefault();
    setGameUrl(domainName + 'multiplayer/' + gameId);
  };

  const createNewGame = (e) => {
    e.preventDefault();
    // Emit an event to the server to create a new game room
    socket.emit('createNewGame', gameId);
  };

  return (
    <>
      <h1>Super Guardians Hangman</h1>
      <p>Nuvarande domän: {window.location.href}</p>

      <form>
        <input
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="namn"
          value={name}
          type="text"
        />
        <button>Spela själv</button>
        <button onClick={createGameUrl}>Spela tillsammans</button>
        <p>Spelare: {name}</p>
        <p>
          Klicka på <b>spela tillsammans </b>
          för att få fram en länk att bjuda in med: <u>{gameUrl}</u>
        </p>

        <button onClick={createNewGame}>Starta spel</button>
      </form>
    </>
  );
};

export default InitNewGame;
