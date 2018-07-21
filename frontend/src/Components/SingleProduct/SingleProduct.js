import React, { Component } from 'react';
import '../general.css';
import './single-product.css'

class View extends Component {
  render() {
    return (
      <div className="single-product-container">
        <div className="col1">
          <img src={this.props.item.picture}/>
          <div>
            <h2> Descripción del producto </h2>
            <span className="description">
              {this.props.item.description}
            </span>
          </div>
        </div>
        <div className="col2">
          <span className="status">{this.props.item.condition} - </span>
          <span className="status">{this.props.item.sold_quantity} vendidos</span>
          <h1>{this.props.item.title}</h1>
          <div>
            <span className="single-product-price">
              ${this.props.item.price.amount}
            </span>
            {(this.props.item.price.decimals == 0) && 
            <sup className="single-product-decimals">
                00
            </sup>}
            {(this.props.item.price.decimals != 0) &&
            <sup className="single-product-decimals">
              {this.props.item.price.decimals}
            </sup>}
            <div className="button"> 
              Comprar
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;
