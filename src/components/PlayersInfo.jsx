import React, { useState, useEffect } from 'react';

//React-icons
import { IoIosRadioButtonOn } from 'react-icons/io';
import { GiPumpkin } from 'react-icons/gi';

//Enable socket-connection
const socket = require('../socket').socket;

export const PlayersInfo = () => {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');

  //Get socket events from backend
  useEffect(() => {
    socket.on('playerOneJoinedRoom', (username) => {
      setPlayerOne(username);
    });

    socket.on('playerTwoJoinedRoom', (data) => {
      setPlayerTwo(data.username);
    });

    socket.on('startGame', (firstPlayer, secondPlayer) => {
      setPlayerOne(firstPlayer);
      setPlayerTwo(secondPlayer);
    });
  }, []);

  return (
    <>
      <div className="position-absolute" style={{ top: '2rem', left: '2rem' }}>
        <p className="text-white mb-2">
          <IoIosRadioButtonOn
            className="mb-1"
            style={playerOne.length > 0 ? { fill: 'green' } : { fill: 'red' }}
          />{' '}
          {playerOne.length > 0 ? playerOne : 'Player One (not connected)'}{' '}
          {/* map later */}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'darkgrey' }} />{' '}
        </p>

        <p className="text-white">
          <IoIosRadioButtonOn
            className="mb-1"
            style={playerTwo.length > 0 ? { fill: 'green' } : { fill: 'red' }}
          />{' '}
          {playerTwo.length > 0 ? playerTwo : 'Player Two (not connected)'}{' '}
          {/* map later */}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
          <GiPumpkin className="mb-1" style={{ fill: 'orange' }} />{' '}
        </p>
      </div>
    </>
  );
};

export default PlayersInfo;
