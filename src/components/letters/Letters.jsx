import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GameContext } from '../../GameContext';
import './Letters.css';

//Enable socket-connection
const socket = require('../../socket').socket;

const Letters = () => {
  const { playerOneContext, playerTwoContext } = useContext(GameContext);
  const [playerOne] = playerOneContext;
  const [playerTwo] = playerTwoContext;

  const [currentSocketId, setCurrentSocketID] = useState('');
  const location = useLocation();

  useEffect(() => {
    location.state === 'initGame'
      ? setCurrentSocketID(playerOne.socketId)
      : setCurrentSocketID(playerTwo.socketId);
  }, [location.state, playerOne.socketId, playerTwo.socketId]);

  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const [guesses, setGuesses] = useState([]);

  const checkLetter = (e) => {
    let letter = e.target.value;
    socket.emit('guessLetter', letter, currentSocketId);
    setGuesses((prevGuesses) => [...prevGuesses, letter]);
  };

  return (
    <div className="letter-wrapper">
      <div className="letter-container">
        {alphabet.map((letter) => (
          <button
            className="letter-icons btn btn-lg btn-primary m-2"
            key={letter}
            value={letter}
            onClick={checkLetter}
            disabled={guesses.includes(letter) ? true : false}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Letters;
