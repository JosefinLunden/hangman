import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Multiplayer, Singleplayer } from './pages';

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
