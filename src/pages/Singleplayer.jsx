import React, { useState } from 'react';
import WordDiv from '../components/WordDiv';
import Letters from '../components/letters/Letters';
import PlayBackground from '../components/PlayBackground';
import Cauldron from '../components/Cauldron';
import Skeleton from '../components/Skeleton';
import InfoModal from '../components/infoModal/InfoModal';
import Button from 'react-bootstrap/Button';

export const Singleplayer = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <PlayBackground />
      <main>
        <h1 className=" font-eater text-white ">Singleplayer</h1>
        <WordDiv />
        <Letters />
        <Button variant="info" onClick={() => setModalShow(true)}>
          Rules
        </Button>
        <Skeleton />
        <Cauldron />
      </main>
      <InfoModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
};
