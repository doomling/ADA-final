import React, { Component } from 'react';
//import './product.css'

class Breadcrum extends Component {
constructor(props) {
super(props)
}


 render() {
    return (
    <div className='breadcrum'>
        <span>{this.props.value}</span>
    </div>
    )
}
}

 export default Breadcrum; 
