import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

//Enable socket-connection
const socket = require('../socket').socket;

export const ErrorMessagePlayers = (props) => {
  const [showErrorModal, setErrorModal] = useState(false);
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  useEffect(() => {
    socket.on('tooManyPlayers', (id) => {
      if (id === props.userId) {
        setErrorModal(true);
      }
    });
  }, [props.userId]);

  return (
    <>
      <Modal show={showErrorModal}>
        <Modal.Header>
          <Modal.Title className="font-creepy text-white">
            There are already two people playing in this room.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            There are alreday two players in this game. If you want to play,
            create a new multiplayer game or play a singleplayer game if you
            don't have any friends.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClick}>
            Go back to homepage
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ErrorMessagePlayers;
