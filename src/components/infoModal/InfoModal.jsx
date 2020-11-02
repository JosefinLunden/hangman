import React from 'react';
import './InfoModal.css';
import { Modal, Button } from 'react-bootstrap';

const InfoModal = ({ show, handleClose }) => {
  return (
    <Modal className="modalBg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">Game Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalText">
        {' '}
        <p>The objective of the game Hangman is to guess the word!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoModal;
