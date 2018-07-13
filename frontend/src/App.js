import React, { Component } from 'react';
//import logo from '../images/Logo_ML@2x.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Components/Home'
import Search from './Components/Search'
import Results from './Results/Results'

class App extends Component {

render() {
  return (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/items/" component={Search} />
    </div>
  </Router>
  );
}

}

export default App;
