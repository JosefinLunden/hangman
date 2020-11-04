import React, { useState, createContext } from 'react';
export const GameContext = createContext();

// States that need to be accessible within the entire App are registrated here
export const GameInfoProvider = (props) => {
  const [playerOne, setPlayerOne] = useState({
    username: '',
    lives: 6,
    spentLives: 0,
    turnToMove: false,
  });

  const [playerTwo, setPlayerTwo] = useState({
    username: '',
    lives: 6,
    spentLives: 0,
    turnToMove: false,
  });

  return (
    <GameContext.Provider
      value={{
        playerOneContext: [playerOne, setPlayerOne],
        playerTwoContext: [playerTwo, setPlayerTwo],
      }}
    >
      {/* Render all child components (see App.js)*/}
      {props.children}
    </GameContext.Provider>
  );
};
