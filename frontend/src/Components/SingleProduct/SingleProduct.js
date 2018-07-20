import React, { Component } from 'react';
import '../general.css';
import './single-product.css'

class View extends Component {
 constructor(props) {
   super(props)
 }

  render() {
    console.log(this.props.item)
    return (
      <div className="single-product-container">
        <div className="col1">
          <img src={this.props.item.picture}/>
          <div>
            <h1> Descripción del producto </h1>
            <span className="description">
              {this.props.item.description}
            </span>
          </div>
        </div>
        <div className="col2">
          <div>{this.props.item.condition}</div>
          <div>{this.props.item.sold_quantity} vendidos</div>
          <div>{this.props.item.title}</div>
          <div>
            <span>
              {this.props.item.price.amount}
            </span>
            <span>
              {this.props.item.price.decimals}
            </span>
          </div>
          
        </div>
      </div>
    );
  }

}

export default View;
