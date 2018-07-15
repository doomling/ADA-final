import React, { Component } from 'react';
import './home.css';
import Navbar from './Navbar/Navbar'
import qs from 'query-string'
import Breadcrum from './Breadcrum';

class Item extends Component {
 constructor(props) {
   super(props)
 }

 async componentDidMount() {
    const search = qs.parse(this.props.location.search).search
    const getSearch = await fetch('http://localhost:3001/api/items/MLA682627325/description')
    const getSearchJson = await getSearch.json()
    console.log(getSearchJson)
    this.setState({
      data: getSearchJson,
      search: search,
    })
  }

  render() {
    return (
        <section className="home">
            <Navbar/>
        </section>
    );
  }

}

export default Item;
