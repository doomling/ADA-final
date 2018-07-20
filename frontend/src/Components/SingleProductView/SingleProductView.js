import React, { Component } from 'react';
import '../general.css';
import './single-product-view.css'
import Navbar from '../Navbar/Navbar'
import SingleProduct from '../SingleProduct/SingleProduct';
import Breadcrum from '../Breadcrum/Breadcrum'

class SingleProductView extends Component {
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
        <Breadcrum value={this.state.data.categories}/>}
        {this.state.data &&
        <SingleProduct item={this.state.data.item}/>}
        </section>
    );
  }

}

export default SingleProductView;
