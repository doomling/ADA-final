import React, { Component } from 'react';
import '../general.css';
import Navbar from '../Navbar/Navbar'
import Placeholder from '../Placeholder/Placeholder';

class Home extends Component {

  render() {
    return (
        <section className="home">
            <Navbar/>
            <Placeholder/>
        </section>
    );
  }
}

export default Home;
