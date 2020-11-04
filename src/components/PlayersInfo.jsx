import React, { useContext } from 'react';
import { GameContext } from '../GameContext';

//React-icons
import { IoIosRadioButtonOn } from 'react-icons/io';
import { GiPumpkin } from 'react-icons/gi';

export const PlayersInfo = () => {
  //Get states from GameContext
  const { playerOneContext, playerTwoContext } = useContext(GameContext);
  const [playerOne] = playerOneContext;
  const [playerTwo] = playerTwoContext;

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
            style={playerOne.connected ? { fill: 'green' } : { fill: 'red' }}
          />{' '}
          {playerOne.connected ? playerOne.username : 'Player One'}{' '}
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
            style={playerTwo.connected ? { fill: 'green' } : { fill: 'red' }}
          />{' '}
          {playerTwo.connected > 0 ? playerTwo.username : 'Player Two'}{' '}
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
