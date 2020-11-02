import React, { useState, useEffect } from 'react';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import ErrorMessagePlayers from '../components/ErrorMessagePlayers';


// Import Bootstrap components
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

// Import React-icons
import { GiGhost } from 'react-icons/gi';

//Enable socket-connection
const socket = require('../socket').socket;

const JoinGameModal = () => {
  const [joinGameModal, setJoinGameModal] = useState(true);
  const [username, setUsername] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [gameCanceled, setGameCanceled] = useState(false);

  const location = useLocation();

  //userData to send to backend
  const userData = {
    gameId: useParams().gameId,
    username: username,
    isCreator: false,
  };

  //Show this modal ONLY when joining a game NOT when initating a new game
  useEffect(() => {
    location.state !== 'initGame'
      ? setJoinGameModal(true)
      : setJoinGameModal(false);
  }, [location]);

  //Disable start button if the user has not specified an username
  useEffect(() => {
    username.length > 0 ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [username]);

  //Join game
  const joinGame = () => {
    // Emit an event to the server to join a game room
    socket.emit('playerJoinsGame', userData);
    //Hide modal
    setJoinGameModal(false);
  };

  return (
    <>
      <Modal show={joinGameModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className="font-eater text-white">
            Join a game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter your username</p>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <GiGhost style={{ fill: '#321291', fontSize: '1.5rem' }} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setGameCanceled(true)}>
            Quit game
          </Button>
          <Button
            disabled={buttonDisabled}
            variant="success"
            onClick={joinGame}
          >
            Start
          </Button>
        </Modal.Footer>
      </Modal>

      {/* If game is cancelled before started redirect to homepage */}
      {gameCanceled && <Redirect to={{ pathname: `/` }} />}
      <ErrorMessagePlayers/>
    </>
  );
};

export default JoinGameModal;
