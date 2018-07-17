import React, { Component } from 'react';
import './home.css';

class View extends Component {
 constructor(props) {
   super(props)
 }

  render() {
    console.log(this.props.item)
    return (
      <div>
        <img src={this.props.item.picture}/>
        <div>{this.props.item.condition}</div>
        <div>{this.props.item.sold_quantity}</div>
        <div>{this.props.item.title}</div>

        <div>{this.props.item.price.amount}</div>
        <div>{this.props.item.price.decimals}</div>
        <div>{this.props.item.description}</div>
      </div>
    );
  }

}

export default View;
