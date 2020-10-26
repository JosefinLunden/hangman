//Obs, this is only for basic logic set up so far. No correct elements, styling validation, etc. have been added yet.
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
const socket = require('../socket').socket;

const InitNewGame = () => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');
  const [gameUrl, setGameUrl] = useState('');

  //Temporary way to get the current domain name
  const domainName = window.location.href;

  const createNewGame = (e) => {
    const uuid = uuidv4();
    e.preventDefault();
    setGameId(uuid);
    //Create url for invitation
    setGameUrl(domainName + 'multiplayer/' + uuid);
  };

  useEffect(() => {
    if (gameId.length > 0) {
      // Emit an event to the server to create a new game room
      socket.emit('createNewGame', gameId);
    }
  }, [gameId]);

  return (
    <>
      <form>
        <label htmlFor="name">Username</label>
        <br />
        <input
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
        />

        <br />
        <br />
        <input type="radio" name="game-type" id="single" value="single" />
        <label htmlFor="single">Single Game</label>
        <input type="radio" name="game-type" id="duo" value="duo" />
        <label htmlFor="duo">Duo Game</label>

        <p>Spelare: {name}</p>
        <button onClick={createNewGame}>Start game</button>
      </form>

      {gameUrl && (
        <p>
          Congratulations! A new game is now initiate. Send an invitation with
          the following URL to your friend: <u>{gameUrl}</u>
        </p>
      )}
    </>
  );
};

export default InitNewGame;
