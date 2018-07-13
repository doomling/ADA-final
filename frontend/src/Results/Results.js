import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import Product from '../Product/Product'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import qs from 'query-string'

class Results extends Component {
  constructor(props) {
   super(props)
   this.state = {
    search: "",
    data: {
    author: {
        user: 'placeholder',
        lastname: 'placeholder'
     },
    categories: [],
    items: []
        }
    }
    }

 async componentDidMount() {
    const search = qs.parse(this.props.location.search).search
    console.log(search)
    const getSearch = await fetch('http://localhost:3001/api/items?q=' + search)
    const getSearchJson = await getSearch.json()
    console.log(getSearchJson)
    this.setState({
      data: getSearchJson,
      search: search
    })
  }
 
  async componentDidUpdate(prevProps, prevState) {
    console.log(2323, prevProps, prevState)
    const search = qs.parse(this.props.location.search).search
    console.log(search)
    if (search != this.state.search) {
      const getSearch = await fetch('http://localhost:3001/api/items?q=' + search)
      const getSearchJson = await getSearch.json()
      console.log(getSearchJson)
      this.setState({
        data: getSearchJson,
        search: search
      })
    }
  }
 render() {
    return (
      <div>
        <Navbar/>
        {this.state.data.items.map((value, i) => {
            let free
                if (value.free_shipping) {
                    free = 'yay'
                } else {
                    free = 'no'
                }
          return (
            <Product key={i} 
                img={value.picture} 
                title={value.title} 
                price={value.price.amount}
                price={value.location}
                shipping={free}
            />
        )}
      )}
      </div>
     );
   }
 }

 export default Results; 
