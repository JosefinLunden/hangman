import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GameContext } from '../GameContext';

//Show overlay when opponent is making a move
const OpponentsMoveOverlay = () => {
  const location = useLocation();
  const [opponentsMoveOverlay, setOpponentsMoveOverlay] = useState(false);

  //Get states from GameContext
  const { gameContext, playerOneContext, playerTwoContext } = useContext(
    GameContext
  );
  const [game] = gameContext;
  const [playerOne] = playerOneContext;
  const [playerTwo] = playerTwoContext;

  //Logic to show overlay for the current player (if there is time move to ---> Socket.io logic on backend instead to be able to play with multiple gameroom at the same time)
  useEffect(() => {
    if (game.started && location.state === 'initGame') {
      if (playerOne.turnToMove) {
        setOpponentsMoveOverlay(false);
      } else {
        setOpponentsMoveOverlay(true);
      }
    } else if (game.started && location.state !== 'initGame') {
      if (playerTwo.turnToMove) {
        setOpponentsMoveOverlay(false);
      } else {
        setOpponentsMoveOverlay(true);
      }
    }
  }, [location, game.started, playerOne.turnToMove, playerTwo.turnToMove]);

  return (
    <>
      {opponentsMoveOverlay && (
        <div
          className="position-absolute d-flex flex-column justify-content-center align-items-center"
          style={{
            top: '0',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 3,
          }}
        >
          {/* Todo: get opponent name from context api */}
          <p className="text-white h2">GAME IS ON!</p>
          <p className="text-white h4">
            Wait for{' '}
            {playerOne.turnToMove ? playerOne.username : playerTwo.username} to
            make a move
          </p>

          {/* If there is time replace this with our own animation (maybe a sandglass or pumpkin) */}
        </div>
      )}
    </>
  );
};

export default OpponentsMoveOverlay;
