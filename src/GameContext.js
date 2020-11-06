import React, { useState, useEffect, createContext } from 'react';
export const GameContext = createContext();

//Enable socket-connection
const socket = require('./socket').socket;

// States that need to be accessible within the entire App are registrated here
export const GameInfoProvider = (props) => {
  const [game, setGame] = useState({
    started: false,
    finished: false,
    charsInWord: [],
  });

  const [playerOne, setPlayerOne] = useState({
    connected: false,
    username: 'Player One',
    lives: 6,
    spentLives: 0,
    turnToMove: false,
    socketId: '',
  });

  const [playerTwo, setPlayerTwo] = useState({
    connected: false,
    username: 'Player Two',
    lives: 6,
    spentLives: 0,
    turnToMove: false,
    socketId: '',
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

    socket.on(
      'startGame',
      (
        firstPlayer,
        secondPlayer,
        charsArray,
        firstPlayerId,
        secondPlayerId
      ) => {
        setPlayerOne((prevState) => ({
          ...prevState,
          connected: true,
          username: firstPlayer,
          socketId: firstPlayerId,
        }));
        setPlayerTwo((prevState) => ({
          ...prevState,
          connected: true,
          username: secondPlayer,
          socketId: secondPlayerId,
          turnToMove: true,
        }));

        setGame((prevState) => ({
          ...prevState,
          started: true,
          charsInWord: charsArray,
        }));
      }
    );

    socket.on('handleNoMatch', () => {
      // console.log('no match handle');
      if (playerOne.turnToMove) {
        setPlayerOne((prevState) => ({
          ...prevState,
          lives: playerOne.lives - 1,
          turnToMove: false,
        }));

        setPlayerTwo((prevState) => ({
          ...prevState,
          turnToMove: true,
        }));
      } else {
        setPlayerTwo((prevState) => ({
          ...prevState,
          lives: playerTwo.lives - 1,
          turnToMove: false,
        }));

        setPlayerOne((prevState) => ({
          ...prevState,
          turnToMove: true,
        }));
      }
    });
  }, [
    playerOne.currentChars,
    playerOne.lives,
    playerOne.socketId,
    playerOne.turnToMove,
    playerTwo.currentChars,
    playerTwo.lives,
    setPlayerOne,
    setPlayerTwo,
  ]);

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
