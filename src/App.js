import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Multiplayer, Singleplayer } from './pages';

//Connect to backend url
const socket = io.connect('/');

function App() {
  return (
    <div className="App">
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
