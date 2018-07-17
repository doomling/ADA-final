import React, { Component } from 'react';
//import './product.css'

class Breadcrum extends Component {
constructor(props) {
super(props)
}


 render() {
     console.log(this.props)
    return (
    <div className='breadcrum'>
        {this.props.value.map((value, i) => {
            return (
                <div>
                    <span key={i}>{value.name}</span>
                    <span> > </span>
                </div>
            )}
        )}
    </div>
    )}
}

 export default Breadcrum; 
