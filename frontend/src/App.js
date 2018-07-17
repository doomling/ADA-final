import React, { Component } from 'react';
//import logo from '../images/Logo_ML@2x.png';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Components/Home'
import Search from './Components/Search'
import Item from './Components/Item'

class App extends Component {

render() {
  return (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/items/" component={Search} />
      <Route path="/items/:id" component={Item} />
    </div>
  </Router>
  );
}

}

export default App;
