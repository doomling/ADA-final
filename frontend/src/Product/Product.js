import React, { Component } from 'react';
import './product.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Product extends Component {
  constructor(props) {
   super(props)
    }

 render() {
    return (
      <div className='product-container'>
        <img src={this.props.img}/>
        <div className='product-details'>
        <div className='product-price'>
        <span>$</span>
        <span>{this.props.price}</span>
        <span>.</span>
        <span>{this.props.decimals}</span>
        </div>
            <span>{this.props.title}</span>
            <span>{this.props.shipping}</span>
            <span>{this.props.location}</span>
        </div>
    </div>
     );
    }
}


 export default Product; 
