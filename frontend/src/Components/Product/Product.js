import React, { Component } from 'react';
import './product.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Product extends Component {
  constructor(props) {
   super(props)
    }

 render() {
     console.log(this.props.shipping)
    return (
      <div className='product-container'>
        <div className='product-thumbnail'>
            <img src={this.props.img}/>
        </div>
        <div className='product-details'>
            <span className='product-price'>
                <span>$ </span>
                <span>{this.props.price}</span>
                {this.props.shipping &&
                <span><img src="./images/ic_shipping.png"/></span>}
            </span>
            <span>{this.props.title}</span>
        </div>
        <div className="product-location">
            <span>{this.props.location}</span>
        </div>
    </div>
     );
    }
}


 export default Product; 
