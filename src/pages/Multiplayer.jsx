import React from 'react';
import RenderWordLines from '../components/RenderWordLines';
import Letters from '../components/letters/Letters';
import StartNewMultigameModal from '../components/StartNewMultigameModal';

export const Multiplayer = () => (
  <>
    <StartNewMultigameModal />
    <RenderWordLines />
    <Letters />
  </>
);
