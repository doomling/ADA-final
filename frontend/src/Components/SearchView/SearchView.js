import React, { Component } from 'react';
//import './home.css';
import Navbar from '../Navbar/Navbar'
import ResultsView from '../ResultsView/ResultsView'

class SearchView extends Component {
 constructor(props) {
   super(props)
   this.state = {
    data: {},
   }
 }

  render() {
    console.log(this.state.data)
    return (
        <section className="home">
            <Navbar/>
            <ResultsView location={this.props.location} />
        </section>
    );
  }
}

export default SearchView;
