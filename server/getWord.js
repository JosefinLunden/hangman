const axios = require('axios').default;
require('dotenv').config(); // Only needed in development

const api_key = process.env.REACT_APP_WORDNIK_API_KEY;
const url = `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${api_key}`;

const getWord = async (req, res) => {
  try {
    const response = await axios.get(url);
    const randomWord = response.data.word;
    const wordLength = randomWord.length;
    res.send({ word: randomWord, letters: wordLength });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getWord;
