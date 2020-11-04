const axios = require('axios').default;
require('dotenv').config(); // Only needed in development

const api_key = process.env.REACT_APP_WORDNIK_API_KEY;
// TODO: Uncomment first url and delete second in production
// const url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${api_key}`;
const url = `https://jsonplaceholder.typicode.com/todos/1`;

const getWord = async (req, res) => {
  try {
    //const response = await axios.get(url);
    //console.log(response.data); // DELETE BEFORE PRODUCTION
    const randomWord = 'this-testword-here'; // DELETE BEFORE PRODUCTION Development API-call to make less requests to Wordnik
    // const randomWord = response.data.word; // UNCOMMENT THIS LINE
    const wordLength = randomWord.length;

    let chars = [];
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i].match(/\-/)) chars.push('-');
      else {
        chars.push('');
      }
    }

    console.log(chars);

    return { word: randomWord, charsArray: chars }; // Maybe not send word? Instead push word to socket or array in node?
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getWord;
