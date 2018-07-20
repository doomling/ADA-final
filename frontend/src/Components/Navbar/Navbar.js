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

 handleChange(e) {
  const value = e.target.value
  console.log(value)
  this.setState({
    textValue: value
  })
}

componentDidUpdate() {
  if(this.setState.isRedirecting) {
    this.setState ({
      isRedirecting: false,
    })
  }
}

handleClick = () => {
    this.setState({
      isRedirecting: true,
      finalValue: this.state.textValue,
    })
}

handleKeyPress = (event) => {
  console.log(event.key)
  if(event.key == 'Enter'){
    this.setState({
      isRedirecting: true,
      finalValue: this.state.textValue,
    })
  }
}

 render() {
   const url = "/items?search=" + this.state.finalValue
   console.log(this.state.isRedirecting)
    return (
      <nav>
        {this.state.isRedirecting &&
          <Redirect to={url} />
          }
        <div className="inner-content">
        <Link to="/">
          <img className="logo" src="/images/doomling.png" />
        </Link>
        <div className="search-container">
            <input type="text" value={this.state.textValue} onKeyPress={this.handleKeyPress} onChange={this.handleChange.bind(this)} onSubmit={this.resetField}/>
            <div className="button" onSubmit={this.resetField} onClick={this.handleClick}>
                <Link to={url}><img src="/images/ic_Search.png"/></Link>
            </div>
        </div>
        </div>}
      </nav>
     );
   }
 }

 export default Navbar; 
