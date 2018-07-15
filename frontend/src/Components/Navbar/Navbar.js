import React, { Component } from 'react';
import './navbar.css'
import { Redirect, Switch, Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
   super(props)
   this.state = {
    textValue: '',
    isRedirecting: false
  }
 }

 handleChange(e) {
  const value = e.target.value
  console.log(value)
  this.setState({
    textValue: value
  })
}

handleRedirect = () => {
  this.setState({
    isRedirecting: true
  })
}

 render() {
   const url = "/items?search=" + this.state.textValue
    return (
      <nav>
        {/*this.state.isRedirecting &&
          <Redirect to={url} />*/}
        <div className="inner-content">
        <img className="logo" src="/images/doomling.png" />
        <div className="search-container">
            <input type="text" value={this.state.textValue} onChange={this.handleChange.bind(this)} onSubmit={this.resetField}/>
            <div className="button" onClick={this.handleRedirect} onSubmit={this.resetField}>
                <Link to={url}><img src="./images/ic_Search.png"/></Link>
            </div>
        </div>
        </div>
      </nav>
     );
   }
 }

 export default Navbar; 
