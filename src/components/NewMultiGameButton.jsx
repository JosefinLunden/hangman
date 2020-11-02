import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

//Enable socket-connection
const socket = require('../socket').socket;

const NewMultiGameButton = () => {
  const [gameId, setGameId] = useState('');

  //Disable start button if the user has not specified an username
  useEffect(() => {
    if (gameId.length > 0) {
      // Emit an event to the server to create a new game room
      socket.emit('createNewGame', gameId);
    }
  }, [gameId]);

  return (
    <>
      <Button onClick={() => setGameId(uuidv4())} variant="primary">
        New Multigame
      </Button>
      {gameId && (
        <Redirect
          to={{
            pathname: `/multiplayer/${gameId}`,
            state: 'initGame',
          }}
        />
      )}
    </>
  );
};

export default NewMultiGameButton;
