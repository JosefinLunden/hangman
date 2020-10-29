import React from 'react';
import WordDiv from '../components/WordDiv';
import Letters from '../components/letters/Letters';
import PlayBackground from '../components/PlayBackground';
import Cauldron from '../components/Cauldron';
import Skeleton from '../components/Skeleton';


export const Singleplayer = () => (
  <>
  <PlayBackground />
  <main>
    <h1 className=" font-eater text-white ">Singleplayer</h1>
    <WordDiv />
    <Letters />
    <Skeleton />
    <Cauldron />
    </main>
  </>
);
