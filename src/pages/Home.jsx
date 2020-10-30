import React, { useState }from 'react';
import InitNewGame from '../components/InitNewGame';
import { Button } from "react-bootstrap";
import InfoModal from "../components/infoModal/InfoModal"

export const Home = () => {

  const [modalShow, setModalShow] = useState(false);
  return(
  <>
  <h1>Super Guardians Hangman</h1>
  <InitNewGame />
  
  
  <Button variant="light" onClick={() => setModalShow(true)}>
    Rules
  </Button>
  
  <InfoModal
    show={modalShow}
    handleClose={() => setModalShow(false)}
    header={"Game Rules"}
    body={
    "The objective of the game Hangman is to guess the word!"}
  />
    </>
  )
};
    