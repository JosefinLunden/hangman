import React, { useEffect, useState } from 'react';

//Enable socket-connection
const socket = require('../socket').socket;

const WordDiv = () => {
  const [chars, setChars] = useState([]);

  // Get wordlength from backend
  useEffect(() => {
    socket.on('renderWordLength', (charsArray) => {
      setChars(charsArray);
    });
    socket.on('letterChecked', (match) => {
      let newCharArray = chars;
      let matches = match.foundMatches;
      if (matches.length > 0) {
        for (let i = 0; i < matches.length; i++) {
          newCharArray.splice(matches[i], 1, match.letter);
        }
        setChars(newCharArray);
        // Check if word is finished
        if (!chars.includes('')) {
          console.log('You won!');
        }
      } else {
        console.log('Remove skeletons bodypart');
      }
    });
  }, [chars]);

  const letterDivs = [];
  for (let i = 0; i < chars.length; i++) {
    letterDivs.push(
      <div
        key={i}
        // Change classname when there's a space in the word
        className={chars[i] === ' ' ? 'noline' : 'line'}
      >
        {chars[i]}
      </div>
    );
  }
  return <div className="word">{letterDivs}</div>;
};

export default WordDiv;
