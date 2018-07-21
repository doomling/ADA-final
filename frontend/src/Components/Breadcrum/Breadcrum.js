import React, { Component } from 'react';
import './breadcrum.css'

class Breadcrum extends Component {

render() {
    return (
    <div className='breadcrum'>
        {this.props.value.map((value, i) => {
            return (
                <div key={i}>
                    <span>{value.name}</span>
                    <span className="breadcrum-caret"> > </span>
                </div>
            )}
        )}
    </div>
    )}
}

 export default Breadcrum; 
