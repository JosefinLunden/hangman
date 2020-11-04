import React, { useState } from 'react';
import './Letters.css';

//Enable socket-connection
const socket = require('../../socket').socket;

const Letters = () => {
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
    socket.emit('guessLetter', letter);
    console.log(letter);
    return setGuesses(guesses.push(letter));
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