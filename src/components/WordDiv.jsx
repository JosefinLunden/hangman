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
  }, []);

  const letterDivs = [];
  for (let i = 0; i < specialChars.length; i++) {
    letterDivs.push(<div key={i} id={i.toString()} className="line"></div>);
  }

  return <div className="word">{letterDivs}</div>;
};

export default WordDiv;
