import React from 'react';
import Button from 'react-bootstrap/Button';

export const Home = () => (
  // Flex properties with Bootstrap utilities
  <section
    style={{ height: '100vh' }}
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <h1 class=" font-eater text-white">Super Guardians Hangman</h1>
    <div class="my-5">
      {/* Buttons only for visualization, change to components later */}
      <Button variant="primary">Start new game</Button>{' '}
      <Button variant="primary">Rules</Button>{' '}
    </div>
  </section>
);
