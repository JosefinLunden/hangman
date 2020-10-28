import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
const socket = require('../socket').socket;

const NewMultiGameButton = () => {
  const [gameId, setGameId] = useState('');

  const createNewMultiGame = (e) => {
    e.preventDefault();
    setGameId(uuidv4());
  };

  useEffect(() => {
    if (gameId.length > 0) {
      // Emit an event to the server to create a new game room
      socket.emit('createNewGame', gameId);
    }
  }, [gameId]);

  return (
    <>
      <Button onClick={createNewMultiGame} variant="primary">
        New Multigame
      </Button>
      {gameId && <Redirect to={{ pathname: `/multiplayer/${gameId}` }} />}
    </>
  );
};

export default NewMultiGameButton;
