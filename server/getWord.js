const axios = require('axios').default;
require('dotenv').config(); // Only needed in development

const api_key = process.env.REACT_APP_WORDNIK_API_KEY;
// TODO: Uncomment first url and delete second in production
// const url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${api_key}`;
const url = `https://jsonplaceholder.typicode.com/todos/1`;

const getWord = async (req, res) => {
  try {
    const response = await axios.get(url);
    console.log(response.data); // DELETE BEFORE PRODUCTION
    const randomWord = response.data.title; // DELETE BEFORE PRODUCTION Development API-call to make less requests to Wordnik
    // const randomWord = response.data.word; // UNCOMMENT THIS LINE
    const wordLength = randomWord.length;

    // TODO: Push game object to games array or other solution to keep track of word during game
    // let games = [
    //   {
    //   'gameid': 'uuid',
    //   'players': [
    //     {
    //       'name': 'bla',
    //       'guessedLetters': []
    //     },
    //     {
    //       'name': 'bla2',
    //       'guessedLetters': []
    //     }
    //   ],
    //   'word': 'randomword'
    //   }
    // ]

    const data = { word: randomWord, letters: wordLength }; // Maybe not send word? Instead push word to socket or array in node?
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getWord;
