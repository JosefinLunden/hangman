import React, { useEffect, useState } from 'react';

//Enable socket-connection
const socket = require('../socket').socket;

const WordDiv = () => {
  const [chars, setChars] = useState([]);

  // Get wordlength from backend
  useEffect(() => {
    socket.on('renderWordLength', (charsArray) => {
      setChars(charsArray);
      console.log(charsArray);
    });
    socket.on('letterChecked', (match) => {
      console.log(
        `Letter: ${match.letter} Matched index: ${match.foundMatches}`
      );

      let newCharArray = chars;
      let matches = match.foundMatches;
      if (matches.length > 0) {
        for (let i = 0; i < matches.length; i++) {
          newCharArray.splice(matches[i], 1, match.letter);
          console.log(newCharArray);
        }
        console.log('MATCH!!!!!!!');

        setChars(newCharArray);
      } else {
        console.log('Remove skeletons bodypart');
      }
    });
  }, [chars]);

  const letterDivs = [];
  for (let i = 0; i < chars.length; i++) {
    letterDivs.push(
      <div key={i} id={i.toString()} className="line">
        {chars[i]}
      </div>
    );
  }

  return <div className="word">{letterDivs}</div>;
};

export default WordDiv;
