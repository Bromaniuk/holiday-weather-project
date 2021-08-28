import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Weather from './components/pages/Weather'
import Search from './components/Search';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Search />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/weather' component={Weather} />
      </Switch>
    </Router>
    </>
  );
}

export default App;