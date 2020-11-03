import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const OpponentsMoveOverlay = () => {
  // Set to true to test overlay
  const [opponentsMove, setOpponentsMove] = useState(false);

  return (
    <>
      {opponentsMove && (
        <div
          className="position-absolute d-flex flex-column justify-content-center align-items-center"
          style={{
            top: '0',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 3,
          }}
        >
          {/* Todo: get opponent name from context api */}
          <p className="text-white h2">Opponent is making a move</p>

          {/* If there is time replace this with our own animation (maybe a sandglass or pumpkin) */}
          <Spinner
            animation="border"
            className="my-4"
            style={{ width: '3rem', height: '3rem' }}
            variant="info"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </>
  );
};

export default OpponentsMoveOverlay;
