import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Letters from "./components/letters/Letters"

//Connect to backend url
const socket = io.connect('/');
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Multiplayer, Singleplayer } from './pages';


function App() {
  return (
    <div className="App">
      <h1>Hangman game</h1>
      <Letters></Letters>
      <Router>
        <Switch>
          <Route path="/multiplayer">
            <Multiplayer />
          </Route>
          <Route path="/singleplayer">
            <Singleplayer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
