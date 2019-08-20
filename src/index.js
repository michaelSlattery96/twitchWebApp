import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Games from './components/Games';
import Header from './components/Header';
import Streams from './components/Streams';
import GameStreams from './components/GameStreams';
import ReactDOM from 'react-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';

function App() {

  return (
    <Router>
      <Header/>
      <Route exact path = '/' component={Games} />
      <Route exact path = '/top-streams' component={Streams} />
      <Route exact path = '/game/:name' component={GameStreams} />
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
