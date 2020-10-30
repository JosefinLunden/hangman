import React from 'react';
import Letters from '../components/letters/Letters';
import StartNewMultigameModal from '../components/StartNewMultigameModal';
import WordDiv from '../components/WordDiv';
import PlayBackground from '../components/PlayBackground';
import Cauldron from '../components/Cauldron';
import Skeleton from '../components/Skeleton';

export const Multiplayer = () => (
  <>
    <PlayBackground />
    <main>
      <h1 className=" font-eater text-white ">Multiplayer</h1>
      <StartNewMultigameModal />
      <WordDiv />
      <Letters />
      <Skeleton />
      <Cauldron />
    </main>
  </>
);
