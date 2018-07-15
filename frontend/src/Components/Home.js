import React, { Component } from 'react';
import './home.css';
import Navbar from './Navbar/Navbar'

class Home extends Component {
 constructor(props) {
   super(props)
 }

  render() {
    return (
        <section className="home">
            <Navbar/>
        </section>
    );
  }

}

export default Home;
