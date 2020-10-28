import React from 'react';
import Button from 'react-bootstrap/Button';
import NewMultiGameButton from '../components/NewMultiGameButton';

export const Home = () => (
  // Flex properties with Bootstrap utilities
  <section
    style={{ height: '100vh' }}
    className="d-flex flex-column justify-content-center align-items-center"
  >
    <h1 className="text-center font-eater text-white">
      Super Guardians Hangman
    </h1>
    <div className="my-5">
      <NewMultiGameButton />{' '}
      <Button href="/singleplayer" variant="primary">
        New Singlegame
      </Button>
    </div>
    <Button variant="info">Rules</Button>
  </section>
);
