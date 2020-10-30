import React, { useEffect, useState } from 'react';
const axios = require('axios').default;

const WordDiv = () => {
  const [wordLength, setWordLength] = useState(null);

  // Get wordlength from backend
  useEffect(() => {
    const word = async () => {
      const url = '/api/getword';

      try {
        const response = await axios.get(url);
        let letters = response.data.letters;
        setWordLength(letters);
        console.log(response.data.word); // DELETE BEFORE PRODUCTION only to make testing easier
      } catch (error) {
        console.log('Could not get word because ', error);
      }
    };
    word();
  }, []);

  const letterDivs = [];
  for (let i = 0; i < wordLength; i++) {
    letterDivs.push(<div key={i} id={i.toString()} className="line"></div>);
  }

  return <div className="word">{letterDivs}</div>;
};

export default WordDiv;
