import React, { useState } from 'react';
import WordDiv from '../components/WordDiv';
import Letters from '../components/letters/Letters';
import StartNewMultigameModal from '../components/StartNewMultigameModal';
import JoinGameModal from '../components/JoinGameModal';
import PlayersInfo from '../components/PlayersInfo';
import PlayBackground from '../components/PlayBackground';
import Cauldron from '../components/Cauldron';
import Skeleton from '../components/Skeleton';
import InfoModal from '../components/infoModal/InfoModal';
import Button from 'react-bootstrap/Button';

export const Multiplayer = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <PlayBackground />
      <main>
        <h1 className=" font-eater text-white ">Multiplayer</h1>
        <PlayersInfo />
        <WordDiv />
        <Letters />
        <Button
          className="position-absolute"
          style={{ bottom: '2rem', right: '2rem' }}
          variant="info"
          onClick={() => setModalShow(true)}
        >
          Rules
        </Button>
        <Skeleton />
        <Cauldron />
      </main>

      <StartNewMultigameModal />
      <JoinGameModal />
      <InfoModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
};
