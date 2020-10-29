import React from 'react';
import RenderWordLines from '../components/RenderWordLines'
import Letters from '../components/letters/Letters';
import PlayBackground from '../components/PlayBackground';
import Cauldron from '../components/Cauldron';
import Skeleton from '../components/Skeleton';

export const Multiplayer = () => (
   <>
   <PlayBackground />
   <main>
   
     <h1 className=" font-eater text-white ">Multiplayer</h1>
     <RenderWordLines />
     <Letters />
     <Skeleton />
     <Cauldron />
     </main>
     
   </>
);
