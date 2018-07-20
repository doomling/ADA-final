import React, { Component } from 'react';
//import logo from '../images/Logo_ML@2x.png';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeView from './Components/HomeView/HomeView'
import SearchView from './Components/SearchView/SearchView'
import ItemView from './Components/SingleProductView/SingleProductView'

class App extends Component {

render() {
  return (
  <Router>
    <div>
      <Route exact path="/" component={HomeView} />
      <Route exact path="/items/" component={SearchView} />
      <Route path="/items/:id" component={ItemView} />
    </div>
  </Router>
  );
}

}

export default App;
