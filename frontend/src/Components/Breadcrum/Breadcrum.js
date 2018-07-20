import React, { Component } from 'react';
import './breadcrum.css'

class Breadcrum extends Component {
constructor(props) {
super(props)
}


 render() {
    return (
    <div className='breadcrum'>
        {this.props.value.map((value, i) => {
            return (
                <div key={i}>
                    <span> > </span>
                    <span>{value.name}</span>
                </div>
            )}
        )}
    </div>
    )}
}

 export default Breadcrum; 
