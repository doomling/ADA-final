import React, { Component } from 'react';
//import logo from '../images/Logo_ML@2x.png';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home'
import Search from './Components/Search'

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
