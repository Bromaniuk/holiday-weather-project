import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './components/pages/Home';
import Weather from './components/pages/Weather'
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <>
      <Router>
        <div className='content-wrapper'>
          <div className='header'><Link to='/' className='header-link'>Holiday Weather</Link></div>
          <div className='search-wrapper'>
            <Search />
          </div>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/weather/:country/:city' component={Weather} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;