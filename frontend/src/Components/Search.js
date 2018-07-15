import React, { Component } from 'react';
//import './home.css';
import Navbar from './Navbar/Navbar'
import Results from './Results/Results'

class Search extends Component {
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
            <Results location={this.props.location} />
        </section>
    );
  }
}

export default Search;
