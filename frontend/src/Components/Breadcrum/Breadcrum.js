import React, { Component } from 'react';
import './breadcrum.css'

class Breadcrum extends Component {

render() {
    return (
        <div className='breadcrum'>
            {this.props.value.map((value, i) => {
                return (
                    <span key={i}>
                        {value.name}
                    </span>
                )}
            )}
        </div>
    )}
}

 export default Breadcrum; 
