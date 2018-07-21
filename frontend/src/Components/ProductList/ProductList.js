import React, { Component } from 'react';
import './product-list.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProductList extends Component {
  constructor(props) {
   super(props)
}

 render() {
     const url = "/items/" + this.props.id
    return (
    <div>
        <div className='product-container'>
            <div className='product-thumbnail'>
                <img src={this.props.img}/>
            </div>
            <div className='product-details'>
                <span className='product-price'>
                    <span>$ </span>
                    <span>{this.props.price}</span>
                    {this.props.shipping &&
                    <span className="product-shipping"><img src="./images/ic_shipping.png"/></span>}
                </span>
                <Link to={url}>
                <span>{this.props.title}</span>
                </Link>
            </div>
            <div className="product-location">
                <span>{this.props.location}</span>
            </div>
        </div>
        <hr/>
    </div>
     );
    }
}


 export default ProductList; 
