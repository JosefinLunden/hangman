import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GameContext } from '../GameContext';

//Enable socket-connection
const socket = require('../socket').socket;

const WordDiv = () => {
  //Get states from GameContext
  const { gameContext } = useContext(GameContext);
  const [game] = gameContext;

  const [chars, setChars] = useState([]);
  const [newChars, setNewChars] = useState([]);
  const gameID = useParams().gameId;

  //Set Chars
  useEffect(() => {
    if (game.charsInWord.length > 0) {
      game.charsInWord.forEach((row, i) => {
        setChars((prevChars) => [{ letter: row, index: i }, ...prevChars]);
      });
    }
  }, [game.charsInWord]);

  //Set newChars
  useEffect(() => {
    let usedChars = [];
    let newCharsArray = chars;

    chars.forEach((row, index) => {
      if (row.letter !== '') {
        usedChars.push(row.index);
      } else {
        if (usedChars.includes(row.index)) {
          newCharsArray.splice(index, 1);
        }
      }
    });
    //Sort by index
    newCharsArray.sort((a, b) => (a.index > b.index ? 1 : -1));
    setNewChars(newCharsArray);
  }, [chars]);

  //Socket event
  useEffect(() => {
    socket.on('letterChecked', (match) => {
      if (match.foundMatches.length > 0) {
        match.foundMatches.forEach((row) => {
          setChars((prevChars) => [
            { letter: match.letter, index: row },
            ...prevChars,
          ]);
        });
      } else {
        socket.emit('handleNoMatch', gameID);
        console.log('Remove skelton part');
      }
    });
  }, [gameID]);

  return (
    <div className="word">
      {newChars.map((char, i) => {
        return (
          <div key={i} className="line">
            {char.letter}
          </div>
        );
      })}
    </div>
  );
};

export default WordDiv;
