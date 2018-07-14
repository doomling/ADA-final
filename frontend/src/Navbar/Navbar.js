import React, { Component } from 'react';
import './navbar.css'
import { Redirect } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
   super(props)
   this.state = {
    textValue: '',
    finalValue: [],
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

handleSave(e) {
  const arr = this.state.finalValue
  arr.push({
    text: this.state.textValue,
    id: this.state.finalValue.length,
    editable: false
  })
  this.setState({
    finalValue: arr
  })
}

handleResetField(){
 this.setState({
   textValue: ''
 })
}

handleRedirect = () => {
  console.log('hola')
  this.setState({
    isRedirecting: true
  })
  //return <Redirect to={"/items/?=search" + this.state.textValue} />
}

 render() {
   const url = "/items?search=" + this.state.textValue
    return (
      <nav>
        {this.state.isRedirecting &&
          <Redirect to={url} />
        }
        <div className="inner-content">
        <img className="logo" src="/images/doomling.png" />
        <div className="search-container">
            <input type="text" value={this.state.textValue} onChange={this.handleChange.bind(this)} onSubmit={this.resetField}/>
            <div className="button" onClick={this.handleRedirect} onSubmit={this.resetField}>
                {/*<Link to={"/items/?search=" + this.state.textValue}>
                  <img src="./images/ic_Search.png"/>
                </Link>*/}
            </div>
        </div>
        </div>
      </nav>
     );
   }
 }

 export default Navbar; 
