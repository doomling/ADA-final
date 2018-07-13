import React, { Component } from 'react';
//import './home.css';
import Navbar from '../Navbar/Navbar'

class Home extends Component {
 constructor(props) {
   super(props)
 }

 handleCallback(e) {
    console.log('nada')
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
