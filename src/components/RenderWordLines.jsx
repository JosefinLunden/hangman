//Obs, this is only for basic logic set up so far. No correct elements, styling validation, etc. have been added yet.
import React, {useState} from 'react';
const axios = require('axios').default;

const RenderWordLines = () => {

  const [wordLength, setWordLength] = useState(null)
  
  const word = async () => {
    
    const url = '/api/getWord';
  
  try {
      
    const response = await axios.get(url);
    let letters = response.data.letters;
    setWordLength(letters);
    return

  } catch(error) {
        
    console.log('Could not get word because ', error)
    
  }
}

word();

  return (
    <>
      <h1>{wordLength}</h1>
    </>
  );
};

export default RenderWordLines;
