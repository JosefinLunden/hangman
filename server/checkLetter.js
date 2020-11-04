const checkLetter = (letter, word) => {
  // Make letter into regular expression in order to use RegExp.exec() method
  const regex = new RegExp(letter.toLowerCase(), 'g');
  let match,
    foundMatchIndex = [];
  // Check for the letter in the word
  while ((match = regex.exec(word)) != null) {
    // Push the built in property to array
    foundMatchIndex.push(match.index);
  }
  return { letter: letter, foundMatches: foundMatchIndex };
};

module.exports = checkLetter;
