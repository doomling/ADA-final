import React, { Component } from 'react';
import '../general.css';
import Navbar from '../Navbar/Navbar'

class Home extends Component {

  render() {
    return (
        <section className="home">
            <Navbar/>
        </section>
    );
  }
}

export default Home;
