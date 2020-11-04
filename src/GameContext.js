import React, { useState, useEffect, createContext } from 'react';
export const GameContext = createContext();

//Enable socket-connection
const socket = require('./socket').socket;

// States that need to be accessible within the entire App are registrated here
export const GameInfoProvider = (props) => {
  const [game, setGame] = useState({
    started: false,
    finished: false,
  });

  const [playerOne, setPlayerOne] = useState({
    connected: false,
    username: 'Player One',
    lives: 6,
    spentLives: 0,
    turnToMove: false,
  });

  const [playerTwo, setPlayerTwo] = useState({
    connected: false,
    username: 'Player Two',
    lives: 6,
    spentLives: 0,
    turnToMove: false,
  });

  //Get socket events from backend
  useEffect(() => {
    socket.on('playerOneJoinedRoom', (username) => {
      setPlayerOne((prevState) => ({
        ...prevState,
        connected: true,
        username: username,
      }));
    });

    socket.on('playerTwoJoinedRoom', (data) => {
      setPlayerTwo((prevState) => ({
        ...prevState,
        connected: true,
        username: data.username,
      }));
    });

    socket.on('startGame', (firstPlayer, secondPlayer) => {
      setPlayerOne((prevState) => ({
        ...prevState,
        connected: true,
        username: firstPlayer,
      }));
      setPlayerTwo((prevState) => ({
        ...prevState,
        connected: true,
        username: secondPlayer,
        turnToMove: true,
      }));

      setGame((prevState) => ({
        ...prevState,
        started: true,
      }));
    });
  }, [setPlayerOne, setPlayerTwo]);

  return (
    <GameContext.Provider
      value={{
        gameContext: [game, setGame],
        playerOneContext: [playerOne, setPlayerOne],
        playerTwoContext: [playerTwo, setPlayerTwo],
      }}
    >
      {/* Render all child components (see App.js)*/}
      {props.children}
    </GameContext.Provider>
  );
};
