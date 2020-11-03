import React, { useEffect, useContext } from 'react';
import { GameContext } from '../GameContext';

//React-icons
import { IoIosRadioButtonOn } from 'react-icons/io';
import { GiPumpkin } from 'react-icons/gi';

//Enable socket-connection
const socket = require('../socket').socket;

export const PlayersInfo = () => {
  //Get states from GameContext
  const { playerOneContext, playerTwoContext } = useContext(GameContext);
  const [playerOne, setPlayerOne] = playerOneContext;
  const [playerTwo, setPlayerTwo] = playerTwoContext;

  //Get socket events from backend
  useEffect(() => {
    socket.on('playerOneJoinedRoom', (username) => {
      setPlayerOne((prevState) => {
        return { ...prevState, username: username };
      });
    });

    socket.on('playerTwoJoinedRoom', (data) => {
      setPlayerOne((prevState) => {
        return { ...prevState, username: data.username };
      });
    });

    socket.on('startGame', (firstPlayer, secondPlayer) => {
      setPlayerOne((prevState) => {
        return { ...prevState, username: firstPlayer };
      });
      setPlayerTwo((prevState) => {
        return { ...prevState, username: secondPlayer };
      });
    });
  }, []);

  return (
    <>
      <div
        className="position-absolute"
        style={{ top: '2rem', left: '2rem', zIndex: '5' }}
      >
        {/* PlayerOne info */}
        <p className="text-white mb-2">
          {/* Player connected or not */}
          <IoIosRadioButtonOn
            className="mb-1"
            style={
              playerOne.username.length > 0
                ? { fill: 'green' }
                : { fill: 'red' }
            }
          />{' '}
          {playerOne.username.length > 0 ? playerOne.username : 'Player One'}{' '}
          {/* Lives left (orange pumpkins) */}
          {[...Array(playerOne.lives)].map((pumpkin, i) => {
            return (
              <GiPumpkin
                key={i}
                className="mb-1 mr-1"
                style={{ fill: 'orange' }}
              />
            );
          })}
          {/* Lives spent (grey pumpkins) */}
          {[...Array(playerOne.spentLives)].map((pumpkin, i) => {
            return (
              <GiPumpkin
                key={i}
                className="mb-1 mr-1"
                style={{ fill: 'darkgrey' }}
              />
            );
          })}
        </p>

        {/* PlayerTwo info */}
        <p className="text-white">
          {/* Player connected or not */}
          <IoIosRadioButtonOn
            className="mb-1"
            style={
              playerTwo.username.length > 0
                ? { fill: 'green' }
                : { fill: 'red' }
            }
          />{' '}
          {playerTwo.username.length > 0 ? playerTwo.username : 'Player Two'}{' '}
          {/* Lives left (orange pumpkins) */}
          {[...Array(playerTwo.lives)].map((pumpkin, i) => {
            return (
              <GiPumpkin
                key={i}
                className="mb-1 mr-1"
                style={{ fill: 'orange' }}
              />
            );
          })}
          {/* Lives spent (grey pumpkins)*/}
          {[...Array(playerTwo.spentLives)].map((pumpkin, i) => {
            return (
              <GiPumpkin
                key={i}
                className="mb-1 mr-1"
                style={{ fill: 'darkgrey' }}
              />
            );
          })}
        </p>
      </div>
    </>
  );
};

export default PlayersInfo;
