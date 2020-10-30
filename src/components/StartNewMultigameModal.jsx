import React, { useRef, useState, useEffect } from 'react';
import { Redirect, useParams, useLocation } from 'react-router-dom';

// Import Bootstrap components
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

// Import React-icons
import { GiGhost } from 'react-icons/gi';
import { BsLink } from 'react-icons/bs';

//Enable socket-connection
const socket = require('../socket').socket;

const StartNewMultigameModal = () => {
  const [showStartGameModal, setShowStartGameModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [gameCanceled, setGameCanceled] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  const url = window.location.href;
  const gameId = useParams();
  const location = useLocation();
  const copyUrlLinkButton = useRef(null);
  const urlRef = useRef(null);

  //Show this modal ONLY when initating a new game NOT when joining a game
  useEffect(() => {
    location.state === 'initGame'
      ? setShowStartGameModal(true)
      : setShowStartGameModal(false);
  }, [location]);

  //Disable start button if the user has not specified an username
  useEffect(() => {
    userName.length > 0 ? setButtonDisabled(false) : setButtonDisabled(true);
  }, [userName]);

  //Copy url
  const copyUrl = (e) => {
    urlRef.current.select();
    document.execCommand('copy');
    setUrlCopied(true);
    e.target.focus();
    hideTooltip();
  };

  //Hide tooltip that says "Url copied" after three seconds
  const hideTooltip = () => {
    setTimeout(() => {
      setUrlCopied(false);
    }, 3000);
  };

  //Start game
  const startGame = () => {
    // Emit an event to the server to create a new game room
    socket.emit('createNewGame', gameId);

    //Hide modal
    setShowStartGameModal(false);
  };

  return (
    <>
      <Modal
        show={showStartGameModal}
        onHide={startGame}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="font-eater text-white">
            Welcome to a new game
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>1. First enter your username</p>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <GiGhost style={{ fill: '#321291', fontSize: '1.5rem' }} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="name"
              name="name"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
            />
          </InputGroup>

          <p>2. Invite your friend</p>
          <InputGroup className="mb-4">
            <FormControl
              readOnly
              ref={urlRef}
              placeholder={url}
              type="text"
              value={url}
            />

            <InputGroup.Append>
              <Button
                onClick={copyUrl}
                ref={copyUrlLinkButton}
                variant="outline-primary"
              >
                <BsLink style={{ fontSize: '1.5rem' }} />
              </Button>
              <Overlay target={copyUrlLinkButton.current} show={urlCopied}>
                {(props) => <Tooltip {...props}>Url copied</Tooltip>}
              </Overlay>
            </InputGroup.Append>
          </InputGroup>

          <p>3. Click Start and wait for your friend to join</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setGameCanceled(true)}>
            Quit game
          </Button>
          <Button
            disabled={buttonDisabled}
            variant="success"
            onClick={startGame}
          >
            Start
          </Button>
        </Modal.Footer>
      </Modal>

      {/* If game is cancelled before started redirect to homepage */}
      {gameCanceled && <Redirect to={{ pathname: `/` }} />}
    </>
  );
};

export default StartNewMultigameModal;
