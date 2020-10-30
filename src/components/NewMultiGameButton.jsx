import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';

const NewMultiGameButton = () => {
  const [gameId, setGameId] = useState('');

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
