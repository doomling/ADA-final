import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import ProductList from '../ProductList/ProductList'
import qs from 'query-string'
import Breadcrum from '../Breadcrum/Breadcrum';

class ResultsView extends Component {
  constructor(props) {
   super(props)
   this.state = {
    
    }
  }

 async componentDidMount() {
    const search = qs.parse(this.props.location.search).search
    const getSearch = await fetch('http://localhost:3001/api/items?q=' + search)
    const getSearchJson = await getSearch.json()
    
    this.setState({
      data: getSearchJson,
      search: search,
    })
  }
 
  async componentDidUpdate(prevProps, prevState) {
    const search = qs.parse(this.props.location.search).search
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
        {this.state.data &&
        <Breadcrum value={this.state.data.categories}/>}
        {this.state.data &&
        this.state.data.items.map((value, i) => {
            let free
                if (value.free_shipping) {
                    free = true
                } else {
                    free = false
                }
          return (
            <ProductList key={i} 
                img={value.picture} 
                title={value.title} 
                price={value.price.amount}
                decimals={value.price.decimals}
                location={value.location}
                shipping={free}
                id={value.id}
            />
        )}
      )}
      </div>
     );
   }
 }

 export default ResultsView; 
