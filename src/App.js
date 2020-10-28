import React from 'react';
import './App.scss';
import Letters from './components/letters/Letters';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Multiplayer, Singleplayer } from './pages';
import Background from './components/background'

function App() {
  return (
    <div className="App">
       <Background />
       <main>
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
      </main>
    </div>
  );
}

export default App;
