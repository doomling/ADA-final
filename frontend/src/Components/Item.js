import React, { Component } from 'react';
import './home.css';
import Navbar from './Navbar/Navbar'
import qs from 'query-string'
import View from './View';

class Item extends Component {
 constructor(props) {
   super(props)
   this.state = {

   }
 }

 async componentDidMount() {
    console.log(this.props.location)
    console.log(this.props.match.params.id)
    const id = this.props.match.params.id
    const getSearch = await fetch('http://localhost:3001/api/items/'+ id)
    const getSearchJson = await getSearch.json()
    console.log(getSearchJson)
    this.setState({
      data: getSearchJson,
    })
  }

  /*{this.props.shipping &&
                <span><img src="./images/ic_shipping.png"/></span>}
*/
  render() {
    console.log(this.state.search)
    return (
        <section className="home">
        <Navbar/>
        {this.state.data &&
        <View item={this.state.data.item}/>}
        </section>
    );
  }

}

export default Item;
