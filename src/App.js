import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Multiplayer, Singleplayer } from './pages';
import { GameInfoProvider } from './GameContext.js';

function App() {
  return (
    // All states from GameInfoProvider is now accessible within the entire App
    <GameInfoProvider>
      <div className="App">
        <main>
          <Router>
            <Switch>
              <Route path="/multiplayer/:gameId">
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
    </GameInfoProvider>
  );
}

export default App;
