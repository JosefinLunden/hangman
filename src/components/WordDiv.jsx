import React, { useEffect, useState } from 'react';

//Enable socket-connection
const socket = require('../socket').socket;

const WordDiv = () => {
  const [wordLength, setWordLength] = useState(null);

  // Get wordlength from backend
  useEffect(() => {
    socket.on('renderWordLength', (index) => {
      setWordLength(index);
      console.log(index);
    });
  }, []);

  const letterDivs = [];
  for (let i = 0; i < wordLength; i++) {
    letterDivs.push(<div key={i} id={i.toString()} className="line"></div>);
  }

  return <div className="word">{letterDivs}</div>;
};

export default WordDiv;
