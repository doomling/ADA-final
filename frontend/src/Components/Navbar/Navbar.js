import React, { Component } from 'react';
import './navbar.css'
import { Redirect, Switch, Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
   super(props)
   this.state = {
    textValue: '',
    finalValue: '',
    isRedirecting: false
  }
 }

 // showing the input state change

 handleChange(e) {
  const value = e.target.value
  this.setState({
    textValue: value
  })
}

componentDidUpdate() {
  if (this.state.isRedirecting) {
    this.setState ({
      isRedirecting: false,
    })
  }
}

// saving the final value to use as query

handleClick() {
  if (this.state.textValue != '') {
    this.setState({
      isRedirecting: true,
      finalValue: this.state.textValue,
    })
  }
}

// same as handle click but for pressing enter

handleKeyPress(event) {
  if(event.key == 'Enter'){
    if(this.state.textValue != '') {
      this.setState({
        isRedirecting: true,
        finalValue: this.state.textValue,
      })
    }
  }
}

 render() {
   const url = "/items?search=" + this.state.textValue
    return (
      <nav>
        {this.state.isRedirecting && <Redirect to={url} />}
          <div className="inner-content">
          <Link to="/">
            <img className="logo" src="/images/doomling.png" />
          </Link>
          <div className="search-container">
              <input type="text" value={this.state.textValue} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} onSubmit={this.resetField}/>
              <div className="button" onSubmit={this.resetField} onClick={this.handleClick.bind(this)}>
                  <Link to={url}><img src="/images/ic_Search.png"/></Link>
              </div>
          </div>
        </div>
      </nav>
     );
   }
 }

 export default Navbar; 
