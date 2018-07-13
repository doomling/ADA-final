import React, { Component } from 'react';
import './searchbar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Searchbar extends Component {
 constructor(props) {
   super(props)
   this.state = {
      textValue: '',
      finalValue: [],
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

  render() {
    return (
        <div className="search-container">
            <input type="text" value={this.state.textValue} onChange={this.handleChange.bind(this)} onSubmit={this.resetField}/>
            <div className="button" onClick={this.handleSave.bind(this)} onSubmit={this.resetField}>
                <Link to={"/items/?search=" + this.state.textValue}>
                  <img src="./images/ic_Search.png"/>
                </Link>
            </div>
        </div>
    );
  }

}

export default Searchbar;
