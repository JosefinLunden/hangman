import React, { useState } from 'react';
import WordDiv from '../components/WordDiv';
import Letters from '../components/letters/Letters.jsx';
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
        <h1
          className="font-butcher text-white position-relative"
          style={{ zIndex: 5 }}
        >
          Singleplayer
        </h1>
        <WordDiv />
        <Letters />
        <Button
          className="position-absolute"
          style={{ bottom: '2rem', right: '2rem', zIndex: 5 }}
          variant="info"
          onClick={() => setModalShow(true)}
        >
          Rules
        </Button>
        <Skeleton />
        <Cauldron />
      </main>
      <InfoModal show={modalShow} handleClose={() => setModalShow(false)} />
    </>
  );
};
