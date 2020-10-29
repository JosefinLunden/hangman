import React from 'react';
import Letters from '../components/letters/Letters';
import PlayBackground from '../components/PlayBackground';
import '../App.scss';

export const Singleplayer = () => (
  <>
  <PlayBackground />
  <main>
    <h1 className=" font-eater text-white ">Singleplayer</h1>
    
    <Letters />
    </main>
  </>
);
