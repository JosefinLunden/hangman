import React from "react";
import './InfoModal.css';
import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ show, handleClose, header, body }) => {
  return (    
  <Modal className="modalBg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>   
        <Modal.Title className="modalTitle">{header}</Modal.Title>
      </Modal.Header>
    <Modal.Body className="modalText"> <p>{body}</p></Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={handleClose}>
        OK
      </Button>
    </Modal.Footer>  
  </Modal>
  );
}

  export default InfoModal;