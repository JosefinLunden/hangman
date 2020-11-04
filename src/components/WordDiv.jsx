import React, { useEffect, useState } from 'react';

//Enable socket-connection
const socket = require('../socket').socket;

const WordDiv = () => {
  const [specialChars, setSpecialChars] = useState([]);

  // Get wordlength from backend
  useEffect(() => {
    socket.on('renderWordLength', (charsArray) => {
      setSpecialChars(charsArray);
      console.log(charsArray);
    });
    socket.on('letterChecked', (match) => {
      let prevCharArray = specialChars;
      console.log(
        `Letter: ${match.letter} Matched index: ${match.foundMatches}`
      );
      // let matches = match.foundMatches;
      // if (matches.length > 0) {
      //   for (let i = 0; i < matches.length; i++) {
      //     setSpecialChars(prevCharArray.splice(matches[i], 1, match.letter));
      //   }
      // } else {
      //   console.log('Remove skeletons bodypart');
      // }
    });
  }, [specialChars]);

  const letterDivs = [];
  for (let i = 0; i < specialChars.length; i++) {
    letterDivs.push(
      <div key={i} id={i.toString()} className="line">
        {specialChars[i]}
      </div>
    );
  }

  return <div className="word">{letterDivs}</div>;
};

export default WordDiv;
