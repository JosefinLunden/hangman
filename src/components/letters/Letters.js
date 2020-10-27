import React from 'react';
import './Letters.css';

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

  return (
    <div className="letter-wrapper">
      <div className="letter-container">
        {alphabet.map((letter) => (
          <div className="letter-icons">{letter}</div>
        ))}
      </div>
    </div>
  );
};

export default Letters;
